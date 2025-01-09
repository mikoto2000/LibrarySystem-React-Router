import type { Route } from "./+types/author";
import { AuthorDetailPage } from "../../pages/author/AuthorDetailPage";
import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { Author } from "~/types";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const selectResult = (await db.select().from(authorTable).where(eq(authorTable.id, Number(id))))[0];

  const author: Author = {
    id: selectResult.id,
    name: selectResult.name,
  };

  return { author };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AuthorDetail({ loaderData }: Route.ComponentProps) {
  return <AuthorDetailPage
    author={loaderData.author}
  />;
}

