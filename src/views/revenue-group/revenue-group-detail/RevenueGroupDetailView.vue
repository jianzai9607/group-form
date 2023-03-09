<template>
  <div v-if="selectedRevenueGroup" class="flex flex-col items-stretch justify-start">
    <a-page-header :title="selectedRevenueGroup.groupName">
      <template v-if="selectedRevenueGroup.isSpecialGroup" #tags>
        <a-tag color="#1890ff" class="rounded-2xl">{{ $t("specialGroup") }}</a-tag>
      </template>
      <template #extra>
        <a-button type="primary" @click="openEditDialog"
          ><template #icon><FormOutlined /></template>{{ $t("edit") }}</a-button
        >
        <a-popconfirm
          :title="$t('confirmDelete')"
          placement="bottomRight"
          @confirm="removeRevenueGroup"
        >
          <a-button shape="circle" class="bg-gray-400 bg-opacity-30 border-none"
            ><template #icon><DeleteFilled /></template
          ></a-button>
        </a-popconfirm>
      </template>
      <a-descriptions size="small"
        ><a-descriptions-item>{{
          selectedRevenueGroup.groupDesc
        }}</a-descriptions-item></a-descriptions
      >
    </a-page-header>
    <DataTable
      :data="selectedRevenueGroup.rules"
      :columns="columns"
      :on-row-click="openEditDialog"
      :loading="loading"
    >
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <button
            class="bg-transparent border-none rounded-full cursor-pointer"
            @click.stop="() => removeRule(record.id)"
          >
            <DeleteFilled class="text-gray-500" />
          </button> </template></template
    ></DataTable>
    <CreateRevenueGroupDialog
      ref="createRevenueGroupDialog"
      :key="dialogKey"
      :selected-revenue-group="selectedRevenueGroup"
    />
  </div>
</template>

<script>
import _ from "lodash";
import DataTable from "@/components/tables/DataTable.vue";
import RouteName from "@/router/route-name";
import { DeleteFilled } from "@ant-design/icons-vue";
import { FormOutlined } from "@ant-design/icons-vue";
import CreateRevenueGroupDialog from "../components/CreateRevenueGroupDialog.vue";
import revenueGroupStore from "../store/revenue-group-store";
import { uuid } from "vue-uuid";

const initialColumns = [
  {
    title: "Rule",
    dataIndex: "id",
    width: 100,
    sorter: (a, b) => a.id - b.id
  },
  {
    title: "Field",
    dataIndex: "field",
    sorter: (a, b) => a.field.localeCompare(b.field, "en", { sensitivity: "base" })
  },
  {
    title: "Operator",
    dataIndex: "operator",
    sorter: (a, b) => a.operator.localeCompare(b.operator, "en", { sensitivity: "base" })
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    sorter: (a, b) => a.id - b.id,
    customRender: ({ text }) => `${text}%`
  },
  {
    title: "Action",
    key: "action",
    width: 100,
    fixed: "right"
  }
];

export default {
  name: "RevenueGroupDetailView",
  components: { DeleteFilled, FormOutlined, CreateRevenueGroupDialog, DataTable },
  data() {
    return { dialogKey: uuid.v4(), loading: false, columns: initialColumns };
  },
  computed: {
    selectedRevenueGroup() {
      return revenueGroupStore.getters["selectedRevenueGroup"];
    },
    rules() {
      return this.selectedRevenueGroup?.rules ?? [];
    }
  },
  watch: {
    rules() {
      this.refreshColumns();
    }
  },
  mounted() {
    if (!this.selectedRevenueGroup) {
      this.$router.push({ name: RouteName.revenueGroup });
    } else {
      this.refreshColumns();
    }
  },
  methods: {
    refreshColumns() {
      if (this.selectedRevenueGroup.rules.length > 0) {
        const maxParamGroup = _.maxBy(this.selectedRevenueGroup.rules, function (rule) {
          return Object.keys(rule.parameters).length;
        });

        this.columns = [
          {
            title: "Rule",
            dataIndex: "id",
            width: 100,
            sorter: (a, b) => a.id - b.id
          },
          {
            title: "Field",
            dataIndex: "field",
            sorter: (a, b) => a.field.localeCompare(b.field, "en", { sensitivity: "base" })
          },
          {
            title: "Operator",
            dataIndex: "operator",
            sorter: (a, b) => a.operator.localeCompare(b.operator, "en", { sensitivity: "base" })
          },
          ...Object.keys(maxParamGroup.parameters).map((paramId) => {
            return {
              title: paramId,
              dataIndex: "parameters",
              sorter: (a, b) => {
                return (
                  a.parameters[paramId] ??
                  "".localeCompare(b.parameters[paramId] ?? "", "en", {
                    sensitivity: "base"
                  })
                );
              },
              customRender: ({ record }) => {
                return record.parameters[paramId];
              }
            };
          }),
          {
            title: "Revenue",
            dataIndex: "revenue",
            sorter: (a, b) => a.id - b.id,
            customRender: ({ text }) => `${text}%`
          },
          {
            title: "Action",
            key: "action",
            width: 100,
            fixed: "right"
          }
        ];
      } else {
        this.columns = initialColumns;
      }
    },
    openEditDialog() {
      this.$refs.createRevenueGroupDialog.openDialog();
    },
    async removeRevenueGroup() {
      await revenueGroupStore.dispatch("removeRevenueGroup", this.selectedRevenueGroup.id);
      this.$router.push({ name: RouteName.revenueGroup });
    },
    async removeRule(id) {
      this.loading = true;
      var revenueGroup = this.selectedRevenueGroup;
      _.remove(revenueGroup.rules, (n) => n.id == id);
      revenueGroup.rules.forEach((rule, index) => (rule.id = index + 1));

      await revenueGroupStore.dispatch("editRevenueGroup", { id: revenueGroup.id, revenueGroup });
      await revenueGroupStore.dispatch("setSelectedRevenueGroup", revenueGroup);
      this.dialogKey = uuid.v4();
      this.refreshColumns();
      this.loading = false;
    }
  }
};
</script>
