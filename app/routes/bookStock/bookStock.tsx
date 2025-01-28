import type { Route } from "./+types/bookStock";
import { BookStockPage } from "../../views/pages/bookStock/BookStockPage";
import { bookStockRepository, bookStockStatusRepository } from "~/di";

export async function loader({ request }: Route.LoaderArgs) {
  // クエリパラメーターから検索条件・オーダー・ページネーション情報を取得
  const searchParams = new URL(request.url).searchParams;
  const name = searchParams.get("name");
  const bookStockStatusId = Number(searchParams.get("bookStockStatusId"));
  const memo = searchParams.get("memo");
  const sortOrder = searchParams.get("sortOrder");
  const orderBy = searchParams.get("orderBy");
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const bookStocks = await bookStockRepository.findAllBookStock(
    name ? name : undefined,
    bookStockStatusId ? bookStockStatusId : undefined,
    memo ? memo : undefined,
    sortOrder ? sortOrder : undefined,
    orderBy ? orderBy : undefined,
    page ? page : undefined,
    limit ? limit : undefined,
  );

  // 全 bookStockStatuses の取得
  const bookStockStatuses = await bookStockStatusRepository.findAllBookStockStatus();

  return {
    bookStocks, searchParam: {
      name: name ? name : "",
      bookStockStatusId: bookStockStatusId ? bookStockStatusId : 0,
      memo: memo ? memo : "",
      sortOrder: sortOrder ? sortOrder : "",
      orderBy: orderBy ? orderBy : "",
      page: page ? page : 1,
      limit: limit ? limit : 10,
    },
    bookStockStatuses
  };
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
    searchParam={loaderData.searchParam}
    bookStockStatuses={loaderData.bookStockStatuses}
  />;
}

