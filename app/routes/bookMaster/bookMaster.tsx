import type { Route } from "./+types/bookMaster";
import { BookMasterPage } from "../../views/pages/bookMaster/BookMasterPage";
import type { BookMasterList } from "~/views/types";
import { bookMasterRepository } from "~/di";

export async function loader({ request }: Route.LoaderArgs) {
  // クエリパラメーターから検索条件・オーダー・ページネーション情報を取得
  const searchParams = new URL(request.url).searchParams;
  const isbn = searchParams.get("isbn");
  const name = searchParams.get("name");
  const publicationDateBegin = searchParams.get("publicationDateBegin");
  const publicationDateEnd = searchParams.get("publicationDateEnd");
  const sortOrder = searchParams.get("sortOrder");
  const orderBy = searchParams.get("orderBy");
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const bookMasters: BookMasterList = await bookMasterRepository.findAllBookMaster(
    isbn ? isbn : undefined,
    name ? name : undefined,
    publicationDateBegin ? publicationDateBegin : undefined,
    publicationDateEnd ? publicationDateEnd : undefined,
    sortOrder ? sortOrder : undefined,
    orderBy ? orderBy : undefined,
    page ? page : undefined,
    limit ? limit : undefined,
  );

  return {
    bookMasters, searchParam: {
      isbn: isbn ? isbn : "",
      name: name ? name : "",
      publicationDateBegin: publicationDateBegin ? publicationDateBegin : "",
      publicationDateEnd: publicationDateEnd ? publicationDateEnd : "",
      sortOrder: sortOrder ? sortOrder : "",
      orderBy: orderBy ? orderBy : "",
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
  return <BookMasterPage
    bookMasters={loaderData.bookMasters}
    searchParam={loaderData.searchParam}
  />;
}

