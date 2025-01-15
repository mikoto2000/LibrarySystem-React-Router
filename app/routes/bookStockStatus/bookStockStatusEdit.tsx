import type { Route } from "./+types/bookStockStatusEdit";
import { BookStockStatusEditPage } from "../../views/pages/bookStockStatus/BookStockStatusEditPage";
import { db } from "~/infra/db";
import { bookStockStatusTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";
import type { BookStockStatus } from "~/types";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const insertResult = await db.update(bookStockStatusTable)
      .set({ name })
      .where(eq(bookStockStatusTable.id, Number(id)))
      .returning();

    return redirect(`/bookStockStatuses/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const bookStockStatus: BookStockStatus = (await db.select().from(bookStockStatusTable).where(eq(bookStockStatusTable.id, Number(id))))[0];

  return { bookStockStatus };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookStockStatusEdit({ loaderData }: Route.ComponentProps) {
  return <BookStockStatusEditPage
    bookStockStatus={loaderData.bookStockStatus}
  />;
}

