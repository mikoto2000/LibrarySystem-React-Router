import type { Route } from "./+types/lendingSetCreate";
import { LendingSetCreatePage } from "../../views/pages/lendingSet/LendingSetCreatePage";
import { redirect } from "react-router";

import { createLendingSet } from "~/services/LendingSetService";
import { bookStockRepository, customerRepository, lendingStatusRepository } from "~/di";

export async function action({ request }: Route.ActionArgs) {
  // リクエストフォームから作成のための情報をもらう
  const formData = await request.formData();
  const lendingStatusId = Number(formData.get("lendingStatusId")?.toString());
  const customerId = Number(formData.get("customerId")?.toString());
  const lendStartDate = formData.get("lendStartDate")?.toString();
  const lendDeadlineDate = formData.get("lendDeadlineDate")?.toString();
  const bookStockIds = formData.getAll("bookStockIds").map((e) => Number(e));
  const memo = formData.get("memo")?.toString();
  if (lendingStatusId && customerId && lendStartDate && lendDeadlineDate && bookStockIds) {
    const insertResult = await createLendingSet({
      lendingStatusId,
      customerId,
      lendStartDate,
      lendDeadlineDate,
      bookStockIds,
      memo,
    });

    return redirect(`/lendingSets/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ }: Route.LoaderArgs) {
  const bookStocks = await bookStockRepository.findAllBookStock();
  const lendingStatuses = await lendingStatusRepository.findAllLendingStatus();
  const customers = await customerRepository.findAllCustomer();

  return { bookStocks, lendingStatuses, customers };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingSetCreate({ loaderData }: Route.ComponentProps) {
  return <LendingSetCreatePage
    customers={loaderData.customers}
    bookStocks={loaderData.bookStocks}
    lendingStatuses={loaderData.lendingStatuses}
  />;
}

