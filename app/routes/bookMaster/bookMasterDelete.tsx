import type { Route } from "./+types/bookMasterDelete";
import { db } from "~/infra/db";
import { bookMasterTable, bookMasterToAuthorTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { BookMaster } from "~/types";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await db.delete(bookMasterToAuthorTable)
      .where(eq(bookMasterToAuthorTable.bookMasterId, Number(id)));
    await db.delete(bookMasterTable)
      .where(eq(bookMasterTable.id, Number(id)));

    return redirect(`/bookMasters`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

