<template>
  <div class="flex flex-col items-stretch justify-start">
    <a-page-header :title="$t('revenueGroups')" :sub-title="$t('revenueGroupList')">
      <template #extra>
        <slot name="extra" />
        <a-button type="primary" @click="openCreateNewDialog"
          ><template #icon><PlusOutlined /></template>{{ $t("createNew") }}</a-button
        >
      </template>
    </a-page-header>
    <DataTable
      :data="revenueGroups"
      :columns="columns"
      :on-row-click="(record) => viewOnPressed(record)"
    >
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <a-button type="primary" @click.stop="() => viewOnPressed(record)">
            {{ $t("view") }}
          </a-button>
        </template></template
      ></DataTable
    >
    <CreateRevenueGroupDialog ref="createRevenueGroupDialog" />
  </div>
</template>

<script>
import DataTable from "@/components/tables/DataTable.vue";
import RouteName from "@/router/route-name";
import { PlusOutlined } from "@ant-design/icons-vue";
import CreateRevenueGroupDialog from "./components/CreateRevenueGroupDialog.vue";
import revenueGroupStore from "./store/revenue-group-store";

const columns = [
  {
    title: "Index",
    dataIndex: "id",
    width: 100,
    sorter: (a, b) => a.id - b.id
  },
  {
    title: "Group Name",
    dataIndex: "groupName",
    sorter: (a, b) => a.groupName.localeCompare(b.groupName, "en", { sensitivity: "base" })
  },
  {
    title: "Action",
    key: "action",
    width: 100,
    fixed: "right"
  }
];

export default {
  name: "RevenueGroupView",
  components: { PlusOutlined, CreateRevenueGroupDialog, DataTable },
  computed: {
    revenueGroups() {
      return revenueGroupStore.getters["revenueGroups"];
    }
  },
  created() {
    this.columns = columns;
  },
  methods: {
    openCreateNewDialog() {
      this.$refs.createRevenueGroupDialog.openDialog();
    },
    viewOnPressed(revenueGroup) {
      revenueGroupStore.dispatch("setSelectedRevenueGroup", revenueGroup);
      this.$router.push({ name: RouteName.revenueGroupDetail });
    }
  }
};
</script>
