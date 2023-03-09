<template>
  <a-modal v-model:visible="isShowDialog" :after-close="afterCloseDialog">
    <template #title>
      {{ $t("createRevenueGroup") }}
    </template>
    <template #footer>
      <a-button key="reset" @click="resetOnPressed">
        {{ $t("reset") }}
      </a-button>
      <a-button key="submit" type="primary" :loading="isLoading" @click="submitOnPressed">
        {{ $t("submit") }}
      </a-button>
    </template>
    <a-form
      ref="formRef"
      name="create-revenue-group-form"
      autocomplete="off"
      :model="formState"
      :colon="false"
      :rules="formRules"
      layout="vertical"
    >
      <div class="flex flex-col items-stretch justify-between gap-x-4">
        <a-form-item name="groupName" :label="$t('groupName')">
          <a-input v-model:value="formState.groupName" :placeholder="$t('name')" />
        </a-form-item>
        <a-form-item name="groupDesc" :label="$t('groupDesc')">
          <a-textarea
            v-model:value="formState.groupDesc"
            :placeholder="capitalFirstOnly($t('addDesc'))"
            :rows="4"
            :maxlength="200"
            show-count
          />
        </a-form-item>
        <a-form-item name="isSpecialGroup">
          <a-checkbox v-model:checked="formState.isSpecialGroup">{{
            capitalFirstOnly($t("specialGroup"))
          }}</a-checkbox>
        </a-form-item>
        <div class="mb-3 flex items-start justify-between">
          <div>{{ $t("rules") }}</div>
          <button
            class="flex items-center justify-center gap-1 bg-blue-200 text-[#1859ff] border-none cursor-pointer rounded-2xl pl-2 pr-3"
            @click="addRule"
          >
            <img class="w-4 h-4 text-[#1859ff]" :src="AddIcon" />
            <div>{{ $t("add") }}</div>
          </button>
        </div>
        <div class="flex flex-col items-stretch justify-start gap-4">
          <div
            v-for="(rule, index) in formState.rules"
            :key="rule.id"
            class="flex flex-col items-stretch justify-start gap-2 pt-2 px-2 border border-gray-400 border-dashed rounded-md"
          >
            <div class="flex items-center justify-between">
              <div>{{ $t("rule") }}&nbsp;{{ index + 1 }}</div>
              <button
                class="bg-transparent border-none rounded-full cursor-pointer p-0"
                @click="() => removeRule(rule.id)"
              >
                <CloseOutlined class="w-4 h-4" />
              </button>
            </div>
            <div
              class="flex flex-wrap items-start justify-start gap-1.5 rounded-sm bg-gray-400 bg-opacity-10 p-2.5"
            >
              <div class="h-[32px] flex items-center justify-start">{{ $t("if") }}</div>
              <a-form-item class="mb-0" :name="['rules', `${index}`, 'field']">
                <a-select
                  v-model:value="rule.field"
                  class="w-28"
                  :placeholder="capitalFirstOnly($t('selectSubject', { subject: $t('field') }))"
                >
                  <a-select-option v-for="field in fieldOptions" :key="field" :value="field">
                    {{ field }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item class="mb-0" :name="['rules', `${index}`, 'operator']">
                <a-select
                  v-model:value="rule.operator"
                  class="w-35"
                  :placeholder="capitalFirstOnly($t('selectSubject', { subject: $t('operator') }))"
                >
                  <a-select-option
                    v-for="operator in operatorOptions"
                    :key="operator"
                    :value="operator"
                  >
                    {{ operator }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <div class="flex flex-col items-stretch justify-start gap-1">
                <a-form-item
                  v-for="(paramId, paramIndex) in Object.keys(rule.parameters)"
                  :key="paramId"
                  class="mb-0"
                  :name="['rules', `${index}`, 'parameters', `${paramId}`]"
                >
                  <div class="flex items-center justify-start gap-2">
                    <a-input
                      v-model:value="rule.parameters[paramId]"
                      class="w-32"
                      :placeholder="
                        capitalFirstOnly($t('enterSubject', { subject: $t('parameter') }))
                      "
                    />
                    <img
                      v-if="paramIndex == 0"
                      class="w-4.5 h-4.5 cursor-pointer"
                      :src="AddCircleOutlineIcon"
                      @click="() => (rule.parameters[`parameter_${uuid.v4()}`] = '')"
                    />
                    <img
                      v-else
                      class="w-4.5 h-4.5 cursor-pointer"
                      :src="RemoveCircleOutlineIcon"
                      @click="() => delete rule.parameters[paramId]"
                    />
                  </div>
                </a-form-item>
              </div>
            </div>
            <div class="mt-1 flex items-center justify-start gap-1">
              <div class="mb-[24px] mr-1">{{ $t("thenTheRevenueIs") }}</div>
              <a-form-item :name="['rules', `${index}`, 'revenue']">
                <a-input-number
                  v-model:value="rule.revenue"
                  prefix="%"
                  class="w-32"
                  :min="0"
                  :placeholder="capitalFirstOnly($t('enterSubject', { subject: $t('amount') }))"
              /></a-form-item>
            </div>
          </div>
        </div>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import AddIcon from "@/assets/icons/add.svg";
import AddCircleOutlineIcon from "@/assets/icons/add_circle_outline.svg";
import RemoveCircleOutlineIcon from "@/assets/icons/remove_circle_outline.svg";
import { capitalFirstOnly } from "@/extensions/format-string";
import { CloseOutlined } from "@ant-design/icons-vue";
import _ from "lodash";
import RevenueGroup from "../models/revenue-group";
import Rule from "../models/rule";
import revenueGroupStore from "../store/revenue-group-store";
import { uuid } from "vue-uuid";

export default {
  name: "CreateRevenueGroupDialog",
  components: { CloseOutlined },
  props: { selectedRevenueGroup: { type: [RevenueGroup, null], default: null } },
  data() {
    return {
      formState: new RevenueGroup({}),
      formRules: {},
      isShowDialog: false,
      isLoading: false
    };
  },
  computed: {
    isEdit() {
      return this.selectedRevenueGroup != null;
    }
  },
  watch: {
    selectedRevenueGroup() {
      this.initEdit();
    }
  },
  created() {
    this.uuid = uuid;
    this.AddIcon = AddIcon;
    this.AddCircleOutlineIcon = AddCircleOutlineIcon;
    this.RemoveCircleOutlineIcon = RemoveCircleOutlineIcon;
    this.capitalFirstOnly = capitalFirstOnly;
    this.Rule = Rule;
    this.fieldOptions = Array(4)
      .fill(null)
      .map((e, i) => `aff_sub_${i}`);
    this.operatorOptions = [
      "is",
      "is not",
      "starts with",
      "ends with",
      "contains",
      "doesn't contains"
    ];
  },
  mounted() {
    if (this.isEdit) {
      this.initEdit();
    }
  },
  methods: {
    initEdit() {
      this.formState = new RevenueGroup(
        _.cloneDeep({
          id: this.selectedRevenueGroup.id,
          groupName: this.selectedRevenueGroup.groupName,
          groupDesc: this.selectedRevenueGroup.groupDesc,
          isSpecialGroup: this.selectedRevenueGroup.isSpecialGroup,
          rules: this.selectedRevenueGroup.rules
        })
      );
    },
    addRule() {
      this.formState.rules.push(new Rule({}));
    },
    removeRule(id) {
      _.remove(this.formState.rules, (item) => item.id == id);
    },
    resetOnPressed() {
      this.$refs.formRef.resetFields();
      if (this.isEdit) {
        this.initEdit();
      }
    },
    async submitOnPressed() {
      this.formRules = {
        groupName: {
          required: true,
          message: capitalFirstOnly(
            this.$t("pleaseInputTheSubject", { subject: this.$t("groupName") })
          )
        },
        rules: this.formState.rules.map((rule) => {
          var parameterValidation = {};

          Object.keys(rule.parameters).forEach((paramId) => {
            parameterValidation[paramId] = { required: true, message: "" };
          });

          return {
            revenue: { required: true, type: "number", message: "" },
            field: { required: true, message: "" },
            operator: { required: true, message: "" },
            parameters: parameterValidation
          };
        })
      };
      this.$nextTick(this.addRevenueGroup);
    },
    async addRevenueGroup() {
      this.isLoading = true;
      try {
        await this.$refs.formRef.validateFields();
        this.formState.rules.forEach((rule, index) => {
          rule.id = index + 1;

          Object.keys(rule.parameters).forEach((paramId, paramIndex) => {
            const newId = `Parameter ${paramIndex + 1}`;
            rule.parameters[newId] = rule.parameters[paramId];
            if (newId != paramId) {
              delete rule.parameters[paramId];
            }
          });
        });

        if (this.isEdit) {
          await revenueGroupStore.dispatch("editRevenueGroup", {
            id: this.selectedRevenueGroup.id,
            revenueGroup: this.formState
          });

          await revenueGroupStore.dispatch("setSelectedRevenueGroup", this.formState);
        } else {
          await revenueGroupStore.dispatch("addRevenueGroup", this.formState);
        }

        this.isShowDialog = false;
        this.$refs.formRef.resetFields();
      } catch (e) {
        console.log("Validate Failed:", e);
      }
      this.isLoading = false;
    },
    openDialog() {
      this.isShowDialog = true;
    },
    closeDialog() {
      this.isShowDialog = false;
    },
    afterCloseDialog() {
      if (this.isEdit) {
        this.initEdit();
        this.formRules = {};
      } else {
        this.$refs.formRef.resetFields();
        this.formState = new RevenueGroup({});
      }
    }
  }
};
</script>

<style scoped></style>
