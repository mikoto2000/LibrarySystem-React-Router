import type { Route } from "./+types/lendingSet";
import { LendingSetDetailPage } from "../../pages/lendingSet/LendingSetDetailPage";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, lendingSetStatusTable, lendingSetTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { LendingSet } from "~/types";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  const selectResult = (await db.select().from(lendingSetTable)
    .leftJoin(bookMasterTable, eq(lendingSetTable.bookMasterId, bookMasterTable.id))
    .leftJoin(lendingSetStatusTable, eq(lendingSetTable.lendingSetStatusId, lendingSetStatusTable.id))
    .where(eq(lendingSetTable.id, Number(id))));

  const lendingSet = selectResult[0];

  return { lendingSet };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingSetDetail({ loaderData }: Route.ComponentProps) {
  return <LendingSetDetailPage
    lendingSet={loaderData.lendingSet}
  />;
}

