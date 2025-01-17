import type { Route } from "./+types/bookStockStatusDelete";

import { redirect } from "react-router";
import { deleteBookStockStatus } from "~/services/BookStockStatusService";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await deleteBookStockStatus(Number(id));

    return redirect(`/bookStockStatuss`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

