import type { Route } from "./+types/customerDelete";
import { db } from "~/infra/db";
import { customerTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { Customer } from "~/types";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await db.delete(customerTable)
      .where(eq(customerTable.id, Number(id)));

    return redirect(`/customers`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}


