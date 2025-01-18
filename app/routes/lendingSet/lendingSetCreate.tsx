import type { Route } from "./+types/lendingSetCreate";
import { LendingSetCreatePage } from "../../views/pages/lendingSet/LendingSetCreatePage";
import { db } from "~/infra/db";
import { lendingSetTable, lendingStatusTable, bookMasterTable, bookStockTable, customerTable, bookStockStatusTable, lendingSetToBookStockTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq, inArray } from "drizzle-orm";
import { createLendingSet } from "~/services/LendingSetService";

export async function action({ request }: Route.ActionArgs) {
  // リクエストフォームから作成のための情報をもらう
  const formData = await request.formData();
  const lendingStatusId = Number(formData.get("lendingStatusId")?.toString());
  const customerId = Number(formData.get("customerId")?.toString());
  const lendStartDate = formData.get("lendStartDate")?.toString();
  const lendDeadlineDate = formData.get("lendDeadlineDate")?.toString();
  const bookStockIds = formData.getAll("bookStockIds").map((e) => Number(e));
  const memo = formData.get("memo")?.toString();
  console.log("👺customerId: " + customerId);
  if (lendingStatusId && customerId && lendStartDate && lendDeadlineDate && bookStockIds) {
    const insertResult = await createLendingSet({
      lendingStatusId,
      customerId,
      lendStartDate,
      lendDeadlineDate,
      bookStockIds,
      memo,
    });

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

