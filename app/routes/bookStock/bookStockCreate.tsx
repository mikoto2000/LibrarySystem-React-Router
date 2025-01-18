import type { Route } from "./+types/bookStockCreate";
import { BookStockCreatePage } from "../../views/pages/bookStock/BookStockCreatePage";

import { redirect } from "react-router";
import type { BookMasterWithoutAuthors } from "~/views/types";
import { bookMasterRepository, bookStockRepository } from "~/di";
import { findAllBookStockStatus } from "~/services/BookStockStatusService";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const bookMasterId = Number(formData.get("bookMasterId")?.toString());
  const bookStockStatusId = Number(formData.get("bookStockStatusId")?.toString());
  const memo = formData.get("memo")?.toString();
  if (bookMasterId && bookStockStatusId) {
    const insertResult = await bookStockRepository.createBookStock([{
      bookMasterId,
      bookStockStatusId,
      memo,
    }]);

    return redirect(`/bookStocks/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ }: Route.LoaderArgs) {
  const selectStatus = await bookMasterRepository.findAllBookMaster();
  const bookStockStatuses = await findAllBookStockStatus();

  const bookMasters: BookMasterWithoutAuthors[] = selectStatus.map((e) => {
    return {
      id: e.id,
      isbn: e.isbn,
      name: e.name,
      publicationDate: e.publicationDate,
    }
  });

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

