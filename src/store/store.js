import { createStore } from "vuex";

import globalModule from "./global-module";

const store = createStore({
  modules: {
    global: globalModule
  }
});

export default store;
