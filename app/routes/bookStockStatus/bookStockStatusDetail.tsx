import type { Route } from "./+types/bookStockStatus";
import { BookStockStatusDetailPage } from "../../pages/bookStockStatus/BookStockStatusDetailPage";
import { db } from "~/infra/db";
import { bookStockStatusTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";

export async function loader({ params, request }: Route.LoaderArgs) {
  const id = params.id;
  const bookStockStatus = (await db.select().from(bookStockStatusTable).where(eq(bookStockStatusTable.id, Number(id))))[0];
  return { bookStockStatus };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookStockStatusDetail({ loaderData }: Route.ComponentProps) {
  return <BookStockStatusDetailPage
    bookStockStatus={loaderData.bookStockStatus}
  />;
}

