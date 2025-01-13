import type { Route } from "./+types/lendingSetCreate";
import { LendingSetCreatePage } from "../../pages/lendingSet/LendingSetCreatePage";
import { db } from "~/infra/db";
import { lendingSetTable, lendingStatusTable, bookMasterTable, bookStockTable, customerTable, bookStockStatusTable, lendingSetToBookStockTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq, inArray } from "drizzle-orm";

export async function action({ request }: Route.ActionArgs) {
  // リクエストフォームから作成のための情報をもらう
  const formData = await request.formData();
  const lendingStatusId = Number(formData.get("lendingStatusId")?.toString());
  const customerId = Number(formData.get("customerId")?.toString());
  const lendStartDate = formData.get("lendStartDate")?.toString();
  const lendDeadlineDate = formData.get("lendDeadlineDate")?.toString();
  const returnDate = formData.get("returnDate")?.toString();
  const bookStockIds = formData.getAll("bookStockIds");
  const memo = formData.get("memo")?.toString();
  console.log("👺customerId: "+ customerId);
  if (lendingStatusId && customerId && lendStartDate && lendDeadlineDate) {
    const lendingSet: typeof lendingSetTable.$inferInsert = {
      lendingStatusId,
      customerId,
      lendStartDate,
      lendDeadlineDate,
      memo,
    };
    const insertResult = await db.insert(lendingSetTable).values(lendingSet).returning();

    // LendingSet to BookStock の中間テーブルを更新
    const lendingSetToBookStocks = bookStockIds.map((e) => {
      return {
        lendingSetId: insertResult[0].id,
        bookStockId: Number(e.toString()),
      }
    });
    await db.insert(lendingSetToBookStockTable).values(lendingSetToBookStocks).returning();

    // BookStock を「貸出不可」に更新
    await db.update(bookStockTable).set({
      bookStockStatusId: 2,
    })
    .where(inArray(bookStockTable.id, bookStockIds.map((e) => Number(e))));

    return redirect(`/lendingSets/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ }: Route.LoaderArgs) {
  const bookStocksSelectResult = await db.select().from(bookStockTable)
    .innerJoin(bookMasterTable, eq(bookMasterTable.id, bookStockTable.bookMasterId))
    .innerJoin(bookStockStatusTable, eq(bookStockStatusTable.id, bookStockTable.bookStockStatusId));

  console.log(bookStocksSelectResult);

  const bookStocks = bookStocksSelectResult.map((e) => {
    return {
      id: e.book_stock.id,
      bookName: e.bookMaster?.name,
      bookStockStatus: e.book_stock_status,
      memo: e.book_stock.memo,
    }
  });
  const lendingStatuses = (await db.select().from(lendingStatusTable));
  const customers = (await db.select().from(customerTable));

  return { bookStocks, lendingStatuses, customers };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingSetCreate({ loaderData }: Route.ComponentProps) {
  return <LendingSetCreatePage
    customers={loaderData.customers}
    bookStocks={loaderData.bookStocks}
    lendingStatuses={loaderData.lendingStatuses}
  />;
}

