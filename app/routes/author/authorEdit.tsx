import type { Route } from "./+types/authorEdit";
import { AuthorEditPage } from "../../views/pages/author/AuthorEditPage";
import { redirect } from "react-router";

import { findAuthorById, updateAuthor } from "~/services/AuthorService";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const updateResult = await updateAuthor(Number(id), { name });

    return redirect(`/authors/${updateResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const author = await findAuthorById(Number(id));

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

