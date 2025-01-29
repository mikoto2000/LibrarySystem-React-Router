import type { Route } from "./+types/lendingSet";
import { LendingSetPage } from "../../views/pages/lendingSet/LendingSetPage";
import { lendingSetRepository } from "~/di";

export async function loader({ request }: Route.LoaderArgs) {
  // クエリパラメーターから検索条件・オーダー・ページネーション情報を取得
  const searchParams = new URL(request.url).searchParams;
  const lendingStatusId = Number(searchParams.get("lendingStatusId"));
  const customer = searchParams.get("customer");
  const lendStartDateBegin = searchParams.get("lendStartDateBegin");
  const lendStartDateEnd = searchParams.get("lendStartDateEnd");
  const lendDeadlineDateBegin = searchParams.get("lendDeadlineDateBegin");
  const lendDeadlineDateEnd = searchParams.get("lendDeadlineDateEnd");
  const returnDateBegin = searchParams.get("returnDateBegin");
  const returnDateEnd = searchParams.get("returnDateEnd");
  const memo = searchParams.get("memo");
  const sortOrder = searchParams.get("sortOrder");
  const orderBy = searchParams.get("orderBy");
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const lendingSets = await lendingSetRepository.findAllLendingSet(
    lendingStatusId ? lendingStatusId : undefined,
    customer ? customer : undefined,
    lendStartDateBegin ? lendStartDateBegin : undefined,
    lendStartDateEnd ? lendStartDateEnd : undefined,
    lendDeadlineDateBegin ? lendDeadlineDateBegin : undefined,
    lendDeadlineDateEnd ? lendDeadlineDateEnd : undefined,
    returnDateBegin ? returnDateBegin : undefined,
    returnDateEnd ? returnDateEnd : undefined,
    memo ? memo : undefined,
    sortOrder ? sortOrder : undefined,
    orderBy ? orderBy : undefined,
    page ? page : undefined,
    limit ? limit : undefined,
  );
  return {
    lendingSets, searchParam: {
      lendingStatusId: lendingStatusId ? lendingStatusId : 0,
      customer: customer ? customer : "",
      lendStartDateBegin: lendStartDateBegin ? lendStartDateBegin : "",
      lendStartDateEnd: lendStartDateEnd ? lendStartDateEnd : "",
      lendDeadlineDateBegin: lendDeadlineDateBegin ? lendDeadlineDateBegin : "",
      lendDeadlineDateEnd: lendDeadlineDateEnd ? lendDeadlineDateEnd : "",
      returnDateBegin: returnDateBegin ? returnDateBegin : "",
      returnDateEnd: returnDateEnd ? returnDateEnd : "",
      memo: memo ? memo : "",
      sortOrder: sortOrder ? sortOrder : "",
      orderBy: orderBy ? orderBy : "",
      page: page ? page : 1,
      limit: limit ? limit : 10,
    }
  }
};

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <LendingSetPage
    lendingSets={loaderData.lendingSets}
    searchParam={loaderData.searchParam}
  />;
}

