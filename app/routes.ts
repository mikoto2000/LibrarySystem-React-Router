import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("authors", "routes/author/author.tsx"),
  route("authors/create", "routes/author/authorCreate.tsx"),
  route("authors/:id/edit", "routes/author/authorEdit.tsx"),
  route("authors/:id", "routes/author/authorDetail.tsx"),
  route("bookMasters", "routes/bookMaster/bookMaster.tsx"),
  route("bookMasters/create", "routes/bookMaster/bookMasterCreate.tsx"),
  route("bookMasters/:id/edit", "routes/bookMaster/bookMasterEdit.tsx"),
  route("bookMasters/:id", "routes/bookMaster/bookMasterDetail.tsx"),
] satisfies RouteConfig;
