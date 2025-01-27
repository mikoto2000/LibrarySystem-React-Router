import type { Route } from "./+types/lendingStatusDelete";

import { redirect } from "react-router";
import { lendingStatusRepository } from "~/di";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await lendingStatusRepository.deleteLendingStatus(Number(id));

    return redirect(`/lendingStatuses`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

