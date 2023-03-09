// Use class instead of Object (cannot initiate import as const Object)
import RevenueGroupRouteConfig from "@/views/revenue-group/revenue-group-routes";

// Use static get intead of (static name = "";) in ES6
export default class RouteName {
  static get revenueGroup() {
    return RevenueGroupRouteConfig.revenueGroup.name;
  }
  static get revenueGroupDetail() {
    return RevenueGroupRouteConfig.revenueGroupDetail.name;
  }
}
