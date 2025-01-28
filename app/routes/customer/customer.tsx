import type { Route } from "./+types/customer";
import { CustomerPage } from "../../views/pages/customer/CustomerPage";
import type { Customer } from "~/types";
import { customerRepository } from "~/di";

export async function loader({ request }: Route.LoaderArgs) {
  // クエリパラメーターから検索条件・オーダー・ページネーション情報を取得
  const searchParams = new URL(request.url).searchParams;
  const name = searchParams.get("name");
  const emailAddress = searchParams.get("emailAddress");
  const sortOrder = searchParams.get("sortOrder");
  const orderBy = searchParams.get("orderBy");
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const customeres: Customer[] = await customerRepository.findAllCustomer(
    name ? name : undefined,
    emailAddress ? emailAddress : undefined,
    sortOrder ? sortOrder : undefined,
    orderBy ? orderBy : undefined,
    page ? page : undefined,
    limit ? limit : undefined,
  );
  return {
    customeres, searchParam: {
      name: name ? name : "",
      emailAddress: emailAddress ? emailAddress : "",
      sortOrder: sortOrder ? sortOrder : "",
      orderBy: orderBy ? orderBy : "",
      page: page ? page : 1,
      limit: limit ? limit : 10,
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
  return <CustomerPage
    customeres={loaderData.customeres}
    searchParam={loaderData.searchParam}
  />;
}

