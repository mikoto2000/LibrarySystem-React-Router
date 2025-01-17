import type { Route } from "./+types/bookStockStatusEdit";
import { BookStockStatusEditPage } from "../../views/pages/bookStockStatus/BookStockStatusEditPage";
import { redirect } from "react-router";

import type { BookStockStatus } from "~/types";
import { findBookStockStatusById, updateBookStockStatus } from "~/services/BookStockStatusService";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const insertResult = await updateBookStockStatus(Number(id), { name });

    return redirect(`/bookStockStatuses/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const bookStockStatus: BookStockStatus = await findBookStockStatusById(Number(id));

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

