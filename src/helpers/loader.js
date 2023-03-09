import store from "@/store/store";

export const showLoading = () => store.dispatch("showLoading");
export const hideLoading = () => store.dispatch("hideLoading");
