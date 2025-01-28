import type { Route } from "./+types/bookStockStatus";
import { BookStockStatusPage } from "../../views/pages/bookStockStatus/BookStockStatusPage";
import type { BookStockStatus } from "~/types";
import { bookStockStatusRepository } from "~/di";

export async function loader({ request }: Route.LoaderArgs) {
  // クエリパラメーターから検索条件・オーダー・ページネーション情報を取得
  const searchParams = new URL(request.url).searchParams;
  const name = searchParams.get("name");
  const sortOrder = searchParams.get("sortOrder");
  const orderBy = searchParams.get("orderBy");
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const bookStockStatuses: BookStockStatus[] = await bookStockStatusRepository.findAllBookStockStatus(
    name ? name : undefined,
    sortOrder ? sortOrder : undefined,
    orderBy ? orderBy : undefined,
    page ? page : undefined,
    limit ? limit : undefined,
  );
  return {
    bookStockStatuses, searchParam: {
      name: name ? name : "",
      sortOrder: sortOrder ? sortOrder : "",
      orderBy: orderBy ? orderBy : "",
      page: page ? page : 1,
      limit: limit ? limit : 10
    }
  };
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
    searchParam={loaderData.searchParam}
  />;
}

