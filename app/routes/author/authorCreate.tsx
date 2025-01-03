import type { Route } from "./+types/authorCreate";
import { AuthorCreatePage } from "../../pages/author/AuthorCreatePage";
import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString()
  if (name) {
    const author: typeof authorTable.$inferInsert = {
      name,
    };
    const insertResult = await db.insert(authorTable).values(author).returning();

    return redirect(`/authors/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AuthorCreate() {
  return <AuthorCreatePage />;
}

