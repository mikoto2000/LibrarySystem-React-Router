import type { Route } from "./+types/bookStock";
import { BookStockPage } from "../../views/pages/bookStock/BookStockPage";
import { db } from "~/infra/db";
import { bookMasterTable, bookStockStatusTable, bookStockTable } from "~/infra/db/schema";
import { eq } from "drizzle-orm";

export async function loader() {
  const bookStocks = await db.select()
    .from(bookStockTable)
    .leftJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
    .leftJoin(bookStockStatusTable, eq(bookStockTable.bookStockStatusId, bookStockStatusTable.id));
  return { bookStocks };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <BookStockPage
    bookStocks={loaderData.bookStocks}
  />;
}

