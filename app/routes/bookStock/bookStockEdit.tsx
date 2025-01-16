import type { Route } from "./+types/bookStockEdit";
import { BookStockEditPage } from "../../views/pages/bookStock/BookStockEditPage";
import { db } from "~/infra/db";
import { bookMasterTable, bookStockStatusTable, bookStockTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";
import { findBookStockById } from "~/services/bookStockService";

export async function action({ request }: Route.ActionArgs) {
  console.dir(request);
  const formData = await request.formData();
  const id = Number(formData.get("id")?.toString());
  const bookMasterId = Number(formData.get("bookMasterId")?.toString());
  const bookStockStatusId = Number(formData.get("bookStockStatusId")?.toString());
  const memo = formData.get("memo")?.toString();
  if (id && bookMasterId && bookStockStatusId) {
    const insertResult = await db.update(bookStockTable)
      .set({
        bookMasterId,
        bookStockStatusId,
        memo,
      })
      .where(eq(bookStockTable.id, Number(id)))
      .returning();

    return redirect(`/bookStocks/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  if (!id) {
    throw "id not found";
  }

  const bookStock = await findBookStockById(Number(id));
  const bookMasters = (await db.select().from(bookMasterTable));
  const bookStockStatuses = (await db.select().from(bookStockStatusTable));

  return { bookStock, bookMasters, bookStockStatuses };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookStockEdit({ loaderData }: Route.ComponentProps) {
  return <BookStockEditPage
    bookStock={loaderData.bookStock}
    bookMasters={loaderData.bookMasters}
    bookStockStatuses={loaderData.bookStockStatuses}
  />;
}

