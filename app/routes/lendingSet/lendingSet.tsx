import type { Route } from "./+types/lendingSet";
import { LendingSetPage } from "../../pages/lendingSet/LendingSetPage";
import { db } from "~/infra/db";
import { bookMasterTable, bookStockTable, lendingStatusTable, lendingSetTable, lendingSetToBookStockTable, customerTable } from "~/infra/db/schema";
import { eq } from "drizzle-orm";
import type { LendingSetListItem } from "~/views/types";

export async function loader() {
  const selectResult = await db.select()
    .from(lendingSetTable)
    .leftJoin(lendingStatusTable, eq(lendingSetTable.lendingStatusId, lendingStatusTable.id))
    .leftJoin(lendingSetToBookStockTable, eq(lendingSetTable.id, lendingSetToBookStockTable.lendingSetId))
    .leftJoin(bookStockTable, eq(bookStockTable.id, lendingSetToBookStockTable.bookStockId))
    .leftJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
    .leftJoin(customerTable, eq(customerTable.id, lendingSetTable.id))

  const groupedLendingSets = Object.groupBy(selectResult, (e: any) => e.lending_set.id);

  const lendingSets = []
  for (const e in groupedLendingSets) {

    const tmp = groupedLendingSets[e];
    if (!tmp) {
      return { lendingSets: [] };
    }

    const lendingSet = tmp.reduce((acumulator, currentValue) => {
      acumulator.id = Number(currentValue.lending_set.id);
      acumulator.customer = currentValue.customer.name;
      acumulator.lendStartDate = currentValue.lending_set.lendStartDate;
      acumulator.lendDeadlineDate = currentValue.lending_set.lendDeadlineDate;
      acumulator.returnDate = currentValue.lending_set.returnDate;
      acumulator.bookStocks.push(currentValue.book_stock.id + ": " + currentValue.bookMaster.name);
      acumulator.memo = currentValue.lending_set.memo;
      return acumulator;
    }, {
      id: 0,
      customer: "",
      lendStartDate: "",
      lendDeadlineDate: "",
      returnDate: undefined,
      bookStocks: [],
      memo: "",
    }) as LendingSetListItem;

    console.log(lendingSet)

    lendingSets.push(lendingSet);
  }

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

