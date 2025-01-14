import type { Route } from "./+types/bookStockDelete";
import { db } from "~/infra/db";
import { bookStockTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { BookStock } from "~/types";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await db.delete(bookStockTable)
      .where(eq(bookStockTable.id, Number(id)));

    return redirect(`/bookStocks`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

