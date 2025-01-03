import type { Route } from "./+types/author";
import { AuthorDetailPage } from "../../pages/author/AuthorDetailPage";
import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";

export async function loader({ params, request }: Route.LoaderArgs) {
  const id = params.id;
  const author = (await db.select().from(authorTable).where(eq(authorTable.id, Number(id))))[0];
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

