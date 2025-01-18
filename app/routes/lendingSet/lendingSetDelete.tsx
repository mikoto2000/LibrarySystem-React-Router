import type { Route } from "./+types/lendingSetDelete";

import { redirect } from "react-router";
import { deleteLendingSet } from "~/services/LendingSetService";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await deleteLendingSet(Number(id));

    return redirect(`/lendingSets`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

