import type { Route } from "./+types/bookStock";
import { BookStockDetailPage } from "../../pages/bookStock/BookStockDetailPage";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, bookStockStatusTable, bookStockTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { BookStock } from "~/types";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  const selectResult = (await db.select().from(bookStockTable)
    .leftJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
    .leftJoin(bookStockStatusTable, eq(bookStockTable.bookStockStatusId, bookStockStatusTable.id))
    .where(eq(bookStockTable.id, Number(id))));

  const bookStock = selectResult[0];

  return { bookStock };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookStockDetail({ loaderData }: Route.ComponentProps) {
  return <BookStockDetailPage
    bookStock={loaderData.bookStock}
  />;
}

