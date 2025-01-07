import type { Route } from "./+types/lendingSet";
import { LendingSetPage } from "../../pages/lendingSet/LendingSetPage";
import { db } from "~/infra/db";
import { bookMasterTable, bookStockTable, lendingStatusTable, lendingSetTable, lendingSetToBookStockTable } from "~/infra/db/schema";
import { eq } from "drizzle-orm";

export async function loader() {
  const lendingSets = await db.select()
    .from(lendingSetTable)
    .leftJoin(lendingStatusTable, eq(lendingSetTable.lendingStatusId, lendingStatusTable.id))
    .leftJoin(lendingSetToBookStockTable, eq(lendingSetTable.id, lendingSetToBookStockTable.lendingSetId))
    .leftJoin(bookStockTable, eq(bookStockTable.id, lendingSetToBookStockTable.bookStockId))
    .leftJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
  return { lendingSets };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <LendingSetPage
    lendingSets={loaderData.lendingSets}
  />;
}

