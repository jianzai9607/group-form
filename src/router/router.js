import { createRouter, createWebHistory } from "vue-router";
import { hideLoading } from "@/helpers/loader";
import RevenueGroupRouteConfig from "@/views/revenue-group/revenue-group-routes";

const routes = [
  ...Object.values(RevenueGroupRouteConfig),
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    redirect: RevenueGroupRouteConfig.revenueGroup.path
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach(() => {
  hideLoading();

  // const isLogin = store.getters["auth/isLogin"];

  // if (to.meta.requiresAuth && !isLogin) {
  //   return { name: RouteName.userLogin };
  // } else if (!to.meta.requiresAuth && isLogin) {
  //   return { name: RouteName.home };
  // } else {
  //   return true;
  // }
});

export default router;
