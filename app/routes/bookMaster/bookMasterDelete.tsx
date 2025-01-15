import type { Route } from "./+types/bookMasterDelete";

import { redirect } from "react-router";
import { deleteBookMaster } from "./util";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await deleteBookMaster(Number(id));

    return redirect(`/bookMasters`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

