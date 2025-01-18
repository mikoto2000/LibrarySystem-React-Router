import type { Route } from "./+types/author";
import { AuthorPage } from "../../views/pages/author/AuthorPage";
import { authorRepository } from "~/di";

export async function loader() {
  const authors = await authorRepository.findAllAuthor();
  return { authors };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <AuthorPage
    authors={loaderData.authors}
  />;
}

