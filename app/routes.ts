import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("authors", "routes/author/author.tsx"),
  route("authors/create", "routes/author/authorCreate.tsx"),
  route("authors/:id/edit", "routes/author/authorEdit.tsx"),
  route("authors/:id", "routes/author/authorDetail.tsx"),
] satisfies RouteConfig;
