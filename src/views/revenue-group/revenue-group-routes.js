import { RouteConfig } from "@/router/route-meta";
import RevenueGroupView from "./RevenueGroupView.vue";
import RevenueGroupDetailView from "./revenue-group-detail/RevenueGroupDetailView.vue";

const RevenueGroupRouteConfig = Object.freeze({
  revenueGroup: new RouteConfig({
    path: "/",
    name: "revenueGroup",
    component: RevenueGroupView
  }),
  revenueGroupDetail: new RouteConfig({
    path: "/revenue-group",
    name: "revenueGroupDetail",
    component: RevenueGroupDetailView
  })
});

export default RevenueGroupRouteConfig;
