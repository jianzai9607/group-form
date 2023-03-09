<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <a-config-provider :locale="language.antdLocale">
    <RouterView />
    <LoadingSpinner v-if="isLoading" />
  </a-config-provider>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store/store";
import LoadingSpinner from "@/components/loading/LoadingSpinner/LoadingSpinner.vue";

export default {
  name: "App",
  components: { LoadingSpinner },
  computed: {
    ...mapGetters(["isLoading", "language"])
  },
  beforeMount() {
    store.dispatch("initLanguage");
  }
};
</script>

<style>
@import "ant-design-vue/dist/antd.css";
@import "@/assets/css/antd.css";
@import "@/assets/css/base.css";
@import "@/assets/css/tailwind.css";
</style>
