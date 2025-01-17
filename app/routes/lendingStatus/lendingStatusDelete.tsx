import type { Route } from "./+types/lendingStatusDelete";

import { redirect } from "react-router";
import { findLendingStatusById } from "~/services/LendingSetService";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await findLendingStatusById(Number(id));

    return redirect(`/lendingStatuses`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

