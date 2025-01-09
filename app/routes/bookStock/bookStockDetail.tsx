import type { Route } from "./+types/bookStockDetail";
import { BookStockDetailPage } from "../../pages/bookStock/BookStockDetailPage";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, bookStockStatusTable, bookStockTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { BookStock } from "~/types";
import { findBookStockById } from "./util";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  if (!id) {
    throw "id not found";
  }

  const bookStock = await findBookStockById(Number(id));

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

