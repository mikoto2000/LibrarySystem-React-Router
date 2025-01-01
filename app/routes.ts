import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("authors", "routes/author/author.tsx"),
  route("authors/create", "routes/author/authorCreate.tsx"),
] satisfies RouteConfig;
