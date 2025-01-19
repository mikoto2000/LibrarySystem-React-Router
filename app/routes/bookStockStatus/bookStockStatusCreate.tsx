import type { Route } from "./+types/bookStockStatusCreate";
import { BookStockStatusCreatePage } from "../../views/pages/bookStockStatus/BookStockStatusCreatePage";
import { redirect } from "react-router";
import { bookStockStatusRepository } from "~/di";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString()
  if (name) {
    const insertResult = await bookStockStatusRepository.createBookStockStatus([{ name }]);

    return redirect(`/bookStockStatuses/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookStockStatusCreate() {
  return <BookStockStatusCreatePage />;
}

