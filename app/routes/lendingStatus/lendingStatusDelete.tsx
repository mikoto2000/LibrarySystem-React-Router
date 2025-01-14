import type { Route } from "./+types/lendingStatusDelete";
import { db } from "~/infra/db";
import { lendingStatusTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { LendingStatus } from "~/types";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await db.delete(lendingStatusTable)
      .where(eq(lendingStatusTable.id, Number(id)));

    return redirect(`/lendingStatuses`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

