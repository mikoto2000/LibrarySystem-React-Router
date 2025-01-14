import type { Route } from "./+types/bookStockStatusDelete";
import { db } from "~/infra/db";
import { bookStockStatusTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { BookStockStatus } from "~/types";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await db.delete(bookStockStatusTable)
      .where(eq(bookStockStatusTable.id, Number(id)));

    return redirect(`/bookStockStatuss`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

