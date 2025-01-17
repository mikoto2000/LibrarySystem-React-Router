import type { Route } from "./+types/bookStockStatusDetail";
import { BookStockStatusDetailPage } from "../../views/pages/bookStockStatus/BookStockStatusDetailPage";

import type { BookStockStatus } from "~/types";
import { findBookStockStatusById } from "~/services/BookStockStatusService";

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

export default function BookStockStatusDetail({ loaderData }: Route.ComponentProps) {
  return <BookStockStatusDetailPage
    bookStockStatus={loaderData.bookStockStatus}
  />;
}

