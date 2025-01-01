import type { Route } from "./+types/author";
import { AuthorPage } from "../pages/AuthorPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index() {
  return <AuthorPage />;
}


