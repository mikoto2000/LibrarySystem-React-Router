import type { Route } from "./+types/lendingSetEdit";
import { LendingSetEditPage } from "../../views/pages/lendingSet/LendingSetEditPage";
import { redirect } from "react-router";

import { findLendingSetById, updateLendingSet } from "~/services/LendingSetService";
import { findAllLendingStatus } from "~/services/LendingStatusService";
import { bookStockRepository, customerRepository } from "~/di";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = Number(formData.get("id")?.toString());
  const customerId = Number(formData.get("customerId")?.toString());
  const lendingStatusId = Number(formData.get("lendingStatusId")?.toString());
  const lendStartDate = formData.get("lendStartDate")?.toString();
  const lendDeadlineDate = formData.get("lendDeadlineDate")?.toString();
  const returnDate = formData.get("returnDate")?.toString();
  const bookStockIds = formData.getAll("bookStockIds").map((e) => Number(e));
  const memo = formData.get("memo")?.toString();
  if (id && customerId && lendingStatusId && lendStartDate && lendDeadlineDate) {
    await updateLendingSet(Number(id), {
        lendingStatusId,
        customerId,
        lendStartDate,
        lendDeadlineDate,
        bookStockIds,
        returnDate: returnDate !== "" ? returnDate : null,
        memo,
      });

    return redirect(`/lendingSets/${id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  const lendingSet = await findLendingSetById(Number(id));
  const lendingStatuses = await findAllLendingStatus();
  const bookStocks = await bookStockRepository.findAllBookStock();
  const customers = await customerRepository.findAllCustomer();

  return { lendingSet, customers, bookStocks, lendingStatuses };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingSetEdit({ loaderData }: Route.ComponentProps) {
  return <LendingSetEditPage
    lendingSet={loaderData.lendingSet}
    customers={loaderData.customers}
    bookStocks={loaderData.bookStocks}
    lendingStatuses={loaderData.lendingStatuses}
  />;
}

