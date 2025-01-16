import type { Route } from "./+types/authorDelete";

import { redirect } from "react-router";
import { deleteAuthor } from "~/services/AuthorService";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await deleteAuthor(Number(id));

    return redirect(`/authors`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

