import type { Route } from "./+types/lendingSetDelete";
import { db } from "~/infra/db";
import { lendingSetTable, lendingSetToBookStockTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { LendingSet } from "~/types";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await db.delete(lendingSetToBookStockTable)
      .where(eq(lendingSetToBookStockTable.lendingSetId, Number(id)));
    await db.delete(lendingSetTable)
      .where(eq(lendingSetTable.id, Number(id)));

    return redirect(`/lendingSets`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

