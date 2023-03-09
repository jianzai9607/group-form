export class RouteMeta {
  constructor({ isAdmin = false, requiresAuth = true }) {
    this.isAdmin = isAdmin;
    this.requiresAuth = requiresAuth;
  }
}

export class RouteConfig {
  constructor({ path, name, component, meta }) {
    this.path = path;
    this.name = name;
    this.component = component;
    this.meta = meta ?? new RouteMeta({});
  }
}
