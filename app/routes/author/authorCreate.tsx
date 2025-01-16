import type { Route } from "./+types/authorCreate";
import { AuthorCreatePage } from "../../views/pages/author/AuthorCreatePage";
import { redirect } from "react-router";
import { createAuthor } from "~/services/AuthorService";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString()
  if (name) {
    const insertResult = await createAuthor([{ name }]);

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

