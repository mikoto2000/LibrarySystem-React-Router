import type { Route } from "./+types/lendingSetEdit";
import { LendingSetEditPage } from "../../pages/lendingSet/LendingSetEditPage";
import { db } from "~/infra/db";
import { bookMasterTable, lendingStatusTable, lendingSetTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";

export async function action({ request }: Route.ActionArgs) {
  console.dir(request);
  const formData = await request.formData();
  const id = Number(formData.get("id")?.toString());
  const bookMasterId = Number(formData.get("bookMasterId")?.toString());
  const lendingSetStatusId = Number(formData.get("lendingSetStatusId")?.toString());
  const memo = formData.get("memo")?.toString();
  if (id && bookMasterId && lendingSetStatusId) {
    const insertResult = await db.update(lendingSetTable)
      .set({
        id,
        lendingSetStatusId,
        memo,
      })
      .where(eq(lendingSetTable.id, Number(id)))
      .returning();

    return redirect(`/lendingSets/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const lendingSet = (await db.select().from(lendingSetTable).where(eq(lendingSetTable.id, Number(id))))[0];
  const bookMasters = (await db.select().from(bookMasterTable));
  const lendingSetStatuses = (await db.select().from(lendingStatusTable));

  return { lendingSet, bookMasters, lendingSetStatuses };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingSetEdit({ loaderData }: Route.ComponentProps) {
  return <LendingSetEditPage
    lendingSet={loaderData.lendingSet}
    bookMasters={loaderData.bookMasters}
    lendingSetStatuses={loaderData.lendingSetStatuses}
  />;
}

