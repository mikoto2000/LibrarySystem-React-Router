import type { Route } from "./+types/bookStockCreate";
import { BookStockCreatePage } from "../../pages/bookStock/BookStockCreatePage";
import { db } from "~/infra/db";
import { bookStockTable, bookStockStatusTable, bookMasterTable } from "~/infra/db/schema";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const bookMasterId = Number(formData.get("bookMasterId")?.toString());
  const bookStockStatusId = Number(formData.get("bookStockStatusId")?.toString());
  const memo = formData.get("memo")?.toString();
  if (bookMasterId && bookStockStatusId) {
    const bookStock: typeof bookStockTable.$inferInsert = {
      bookMasterId,
      bookStockStatusId,
      memo,
    };
    const insertResult = await db.insert(bookStockTable).values(bookStock).returning();

    return redirect(`/bookStocks/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ }: Route.LoaderArgs) {
  const bookMasters = (await db.select().from(bookMasterTable));
  const bookStockStatuses = (await db.select().from(bookStockStatusTable));

  return { bookMasters, bookStockStatuses };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookStockCreate({ loaderData }: Route.ComponentProps) {
  return <BookStockCreatePage
    bookMasters={loaderData.bookMasters}
    bookStockStatuses={loaderData.bookStockStatuses}
  />;
}

