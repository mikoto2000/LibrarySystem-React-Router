import { authorRepository } from "~/di";
import type { Route } from "./+types/authorDelete";

import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await authorRepository.deleteAuthor(Number(id));

    return redirect(`/authors`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

