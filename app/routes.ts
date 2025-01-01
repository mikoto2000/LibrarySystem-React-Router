import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("authors", "routes/author.tsx")
] satisfies RouteConfig;
