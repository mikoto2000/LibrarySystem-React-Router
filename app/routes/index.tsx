import type { Route } from "./+types/index";
import { IndexPage } from "../pages/IndexPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index() {
  return <IndexPage />;
}

