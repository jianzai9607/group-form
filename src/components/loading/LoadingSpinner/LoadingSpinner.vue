<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-30 z-100"
  >
    <a-spin />
  </div>
</template>

<script>
import { h } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

export default {
  name: "LoadingSpinner",
  created() {
    this.indicator = h(LoadingOutlined, {
      style: {
        fontSize: "24px",
      },
      spin: true,
    });
  },
};
</script>

<style scoped></style>
