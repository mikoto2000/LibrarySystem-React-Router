import type { Route } from "./+types/bookStock";
import { BookStockPage } from "../../views/pages/bookStock/BookStockPage";
import { bookStockRepository } from "~/di";

export async function loader() {
  const bookStocks = await bookStockRepository.findAllBookStock();
  return { bookStocks };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <BookStockPage
    bookStocks={loaderData.bookStocks}
  />;
}

