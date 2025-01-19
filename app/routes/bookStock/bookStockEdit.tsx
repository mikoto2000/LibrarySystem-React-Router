import type { Route } from "./+types/bookStockEdit";
import { BookStockEditPage } from "../../views/pages/bookStock/BookStockEditPage";
import { redirect } from "react-router";

import { bookMasterRepository, bookStockRepository, bookStockStatusRepository } from "~/di";

export async function action({ request }: Route.ActionArgs) {
  console.dir(request);
  const formData = await request.formData();
  const id = Number(formData.get("id")?.toString());
  const bookMasterId = Number(formData.get("bookMasterId")?.toString());
  const bookStockStatusId = Number(formData.get("bookStockStatusId")?.toString());
  const memo = formData.get("memo")?.toString();
  if (id && bookMasterId && bookStockStatusId) {
    bookStockRepository.updateBookStock(id, {
      bookMasterId,
      bookStockStatusId,
      memo,
    });

    return redirect(`/bookStocks/${id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  if (!id) {
    throw "id not found";
  }

  const bookStock = await bookStockRepository.findBookStockById(Number(id));
  const bookMasters = await bookMasterRepository.findAllBookMaster();
  const bookStockStatuses = await bookStockStatusRepository.findAllBookStockStatus();

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

