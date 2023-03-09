<template>
  <a-table
    class="data-table"
    :columns="columns"
    :data-source="data"
    :scroll="{ x: 'max-content', y: 500 }"
    :loading="loading"
    :custom-row="
      (record) => {
        return {
          onClick: () => onRowClick?.(record)
        };
      }
    "
    empty-text="No records available"
  >
    <template #bodyCell="{ record, column }">
      <slot name="bodyCell" :record="record" :column="column" />
    </template>
  </a-table>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
    loading: { type: Boolean, default: false },
    onRowClick: { type: [Function, null], default: null }
  }
};
</script>

<style>
.data-table .ant-table-pagination.ant-pagination {
  margin-right: 16px;
}

.data-table .ant-table-tbody .ant-table-row:nth-child(even) {
  background-color: #f4f8fa;
}

.data-table .ant-table-tbody .ant-table-cell-fix-left,
.data-table .ant-table-tbody .ant-table-cell-fix-right {
  background: transparent;
}

.data-table .ant-table-tbody > tr.ant-table-row-selected > td {
  background: transparent;
}
</style>
