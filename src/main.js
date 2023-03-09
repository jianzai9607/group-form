import moment from "moment/min/moment-with-locales";
import { createApp } from "vue";
import antd from "ant-design-vue";
import store from "@/store/store";
import i18n from "@/i18n";
import router from "@/router/router";
import App from "@/App.vue";

moment.updateLocale("en-gb", {
  longDateFormat: {
    ll: "DD MMM YYYY"
  }
});
moment.updateLocale("zh-cn", {
  longDateFormat: {
    ll: "YYYY年M月D日"
  }
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(store);
app.use(antd);

// Custom directive (v-resize)
var resizeHandler;
app.directive("resize", {
  created(el, binding) {
    const onResizeCallback = binding.value;
    resizeHandler = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      onResizeCallback({ width, height });
    };
    window.addEventListener("resize", resizeHandler);
  },
  beforeUnmount() {
    window.removeEventListener("resize", resizeHandler);
  }
});

app.mount("#app");
app.config.globalProperties.$message = antd.message;
