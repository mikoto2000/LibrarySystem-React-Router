import type { Route } from "./+types/bookStockDelete";

import { redirect } from "react-router";
import { bookStockRepository } from "~/di";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    bookStockRepository.deleteBookStock(Number(id));

    return redirect(`/bookStocks`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

