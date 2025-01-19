import type { Route } from "./+types/bookStockStatus";
import { BookStockStatusPage } from "../../views/pages/bookStockStatus/BookStockStatusPage";
import type { BookStockStatus } from "~/types";
import { bookStockStatusRepository } from "~/di";

export async function loader() {
  const bookStockStatuses: BookStockStatus[] = await bookStockStatusRepository.findAllBookStockStatus();
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

