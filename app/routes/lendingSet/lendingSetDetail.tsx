import type { Route } from "./+types/lendingSet";
import { LendingSetDetailPage } from "../../pages/lendingSet/LendingSetDetailPage";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, lendingStatusTable, lendingSetTable, lendingSetToBookStockTable, bookStockTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { LendingSet } from "~/types";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  const selectResult = await db.select()
    .from(lendingSetTable)
    .leftJoin(lendingStatusTable, eq(lendingSetTable.lendingStatusId, lendingStatusTable.id))
    .leftJoin(lendingSetToBookStockTable, eq(lendingSetTable.id, lendingSetToBookStockTable.lendingSetId))
    .leftJoin(bookStockTable, eq(bookStockTable.id, lendingSetToBookStockTable.bookStockId))
    .leftJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
    .where(eq(lendingSetTable.id, Number(id)));

  //const lendingSet = selectResult;
  const lendingSet = selectResult.reduce((acumulator, currentValue) => {
    acumulator.id = currentValue.lending_set.id;
    acumulator.lendStartDate = currentValue.lending_set.lendStartDate;
    acumulator.lendDeadlineDate = currentValue.lending_set.lendDeadlineDate;
    if (currentValue.book_stock) {
      currentValue.book_stock.bookMaster = currentValue.bookMaster;
      acumulator.bookStocks.push(currentValue.book_stock)
    }
    return acumulator;
  },
    {
      id: 0,
      lendStartDate: "",
      lendDeadlineDate: "",
      returnDate: "",
      bookStocks: [],
    } as LendingSet);

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

