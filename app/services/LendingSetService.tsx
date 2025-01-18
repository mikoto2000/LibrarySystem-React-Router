import { db } from "~/infra/db";
import { bookMasterTable, bookStockTable, customerTable, lendingSetTable, lendingSetToBookStockTable, lendingStatusTable } from "~/infra/db/schema";


import { eq } from "drizzle-orm";
import type { LendingSetList } from "~/views/types";

export const findAllLendingSet = async (): Promise<LendingSetList> => {
  // テーブルから情報取得
  const selectResult = await db.select()
    .from(lendingSetTable)
    .leftJoin(lendingStatusTable, eq(lendingSetTable.lendingStatusId, lendingStatusTable.id))
    .leftJoin(lendingSetToBookStockTable, eq(lendingSetTable.id, lendingSetToBookStockTable.lendingSetId))
    .leftJoin(bookStockTable, eq(bookStockTable.id, lendingSetToBookStockTable.bookStockId))
    .leftJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
    .leftJoin(customerTable, eq(customerTable.id, lendingSetTable.customerId))

  // 同じ id ごとに別々の配列に分割する
  const groupedLendingSets = Object.groupBy(selectResult, (e: any) => e.lending_set.id);

  const lendingSets: LendingSetList = []
  for (const e in groupedLendingSets) {

    const tmp = groupedLendingSets[e];
    if (!tmp) {
      return [];
    }

    // id 毎に、ひとつの Object にまとめる
    console.log(tmp);
    const lendingSet = tmp.reduce((acumulator, currentValue) => {
      acumulator.id = Number(currentValue.lending_set.id);
      acumulator.customer = currentValue.customer.name;
      acumulator.lendingStatus = currentValue.lending_status;
      acumulator.lendStartDate = currentValue.lending_set.lendStartDate;
      acumulator.lendDeadlineDate = currentValue.lending_set.lendDeadlineDate;
      acumulator.returnDate = currentValue.lending_set.returnDate;
      acumulator.bookStocks.push(currentValue.book_stock.id + ": " + currentValue.bookMaster.name);
      acumulator.memo = currentValue.lending_set.memo;
      return acumulator;
    }, {
      id: 0,
      customer: "",
      lendingStatus: {},
      lendStartDate: "",
      lendDeadlineDate: "",
      returnDate: undefined,
      bookStocks: [],
      memo: "",
    });

    lendingSets.push(lendingSet);
  }

  return lendingSets;
}
