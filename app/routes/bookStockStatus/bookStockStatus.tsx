import type { Route } from "./+types/bookStockStatus";
import { BookStockStatusPage } from "../../pages/bookStockStatus/BookStockStatusPage";
import { db } from "~/infra/db";
import { bookStockStatusTable } from "~/infra/db/schema";
import type { BookStockStatus } from "~/types";

export async function loader() {
  const bookStockStatuses: BookStockStatus[] = await db.select().from(bookStockStatusTable);
  return { bookStockStatuses };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <BookStockStatusPage
    bookStockStatuses={loaderData.bookStockStatuses}
  />;
}

