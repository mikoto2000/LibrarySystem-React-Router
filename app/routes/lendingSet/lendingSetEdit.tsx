import type { Route } from "./+types/lendingSetEdit";
import { LendingSetEditPage } from "../../pages/lendingSet/LendingSetEditPage";
import { db } from "~/infra/db";
import { bookMasterTable, lendingStatusTable, lendingSetTable, lendingSetToBookStockTable, bookStockTable, bookStockStatusTable, customerTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";
import type { BookMasterList, LendingSet } from "~/views/types";
import type { LendingStatus } from "~/types";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = Number(formData.get("id")?.toString());
  const customerId = Number(formData.get("customerId")?.toString());
  const lendingStatusId = Number(formData.get("lendingStatusId")?.toString());
  const lendStartDate = formData.get("lendStartDate")?.toString();
  const lendDeadlineDate = formData.get("lendDeadlineDate")?.toString();
  const returnDate = formData.get("returnDate")?.toString();
  const bookStockIds = formData.getAll("bookStockIds");
  const memo = formData.get("memo")?.toString();
  if (id && customerId && lendingStatusId && lendStartDate && lendDeadlineDate) {
    const insertResult = await db.update(lendingSetTable)
      .set({
        lendingStatusId,
        customerId,
        lendStartDate,
        lendDeadlineDate,
        returnDate: returnDate !== "" ? returnDate : null,
        memo,
      })
      .where(eq(lendingSetTable.id, Number(id)))
      .returning();

    // 中間テーブルの既存エントリー削除
    await db.delete(lendingSetToBookStockTable)
      .where(eq(lendingSetToBookStockTable.lendingSetId, id));

    // 中間テーブルにエントリー登録
    const lendingSetToBookStocks = bookStockIds.map((e) => {
      return {
        lendingSetId: insertResult[0].id,
        bookStockId: Number(e.toString()),
      }
    });
    await db.insert(lendingSetToBookStockTable).values(lendingSetToBookStocks).returning();

    return redirect(`/lendingSets/${id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const bookMasters: BookMasterList = (await db.select().from(bookMasterTable));
  const lendingStatuses: LendingStatus[] = (await db.select().from(lendingStatusTable));

  const selectResult = await db.select()
    .from(lendingSetTable)
    .innerJoin(lendingStatusTable, eq(lendingSetTable.lendingStatusId, lendingStatusTable.id))
    .innerJoin(lendingSetToBookStockTable, eq(lendingSetTable.id, lendingSetToBookStockTable.lendingSetId))
    .innerJoin(bookStockTable, eq(bookStockTable.id, lendingSetToBookStockTable.bookStockId))
    .innerJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
    .where(eq(lendingSetTable.id, Number(id)));

  //const lendingSet = selectResult;
  const lendingSet = selectResult.reduce((acumulator, currentValue) => {
    acumulator.id = currentValue.lending_set.id;
    acumulator.lendStartDate = currentValue.lending_set.lendStartDate;
    acumulator.lendDeadlineDate = currentValue.lending_set.lendDeadlineDate;
    acumulator.returnDate = currentValue.lending_set.returnDate ? currentValue.lending_set.returnDate : undefined;
    acumulator.memo = currentValue.lending_set.memo ? currentValue.lending_set.memo : "";
    acumulator.bookStocks.push({
      id: currentValue.book_stock.id,
      bookMaster: currentValue.bookMaster,
      memo: currentValue.book_stock.memo ? currentValue.book_stock.memo : "",

    })
    return acumulator;
  },
    {
      id: 0,
      lendingStatus: { id: 1, name: "貸出中" },
      lendStartDate: new Date().toISOString(),
      lendDeadlineDate: new Date().toISOString(),
      returnDate: undefined,
      bookStocks: [],
      memo: "",
    } as LendingSet);

  const bookStocksSelectResult = await db.select().from(bookStockTable)
    .innerJoin(bookMasterTable, eq(bookMasterTable.id, bookStockTable.id))
    .innerJoin(bookStockStatusTable, eq(bookStockStatusTable.id, bookStockTable.bookStockStatusId));
  const bookStocks = bookStocksSelectResult.map((e) => {
    return {
      id: e.book_stock.id,
      bookName: e.bookMaster.name,
    }
  });

  const customers = await db.select().from(customerTable);

  return { lendingSet, customers, bookStocks, lendingStatuses };
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
    customers={loaderData.customers}
    bookStocks={loaderData.bookStocks}
    lendingStatuses={loaderData.lendingStatuses}
  />;
}

