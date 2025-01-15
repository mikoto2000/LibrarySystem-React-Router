import type { Route } from "./+types/authorEdit";
import { AuthorEditPage } from "../../views/pages/author/AuthorEditPage";
import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";
import type { Author } from "~/types";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const insertResult = await db.update(authorTable)
      .set({ name })
      .where(eq(authorTable.id, Number(id)))
      .returning();

    return redirect(`/authors/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const author: Author = (await db.select().from(authorTable).where(eq(authorTable.id, Number(id))))[0];

  return { author };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AuthorEdit({ loaderData }: Route.ComponentProps) {
  return <AuthorEditPage
    author={loaderData.author}
  />;
}

