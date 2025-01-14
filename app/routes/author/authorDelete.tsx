import type { Route } from "./+types/authorDelete";
import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { Author } from "~/types";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await db.delete(authorTable)
      .where(eq(authorTable.id, Number(id)));

    return redirect(`/authors`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

