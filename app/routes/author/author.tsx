import type { Route } from "./+types/author";
import { AuthorPage } from "../../views/pages/author/AuthorPage";
import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";

export async function loader() {
  const authors = await db.select().from(authorTable);
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

