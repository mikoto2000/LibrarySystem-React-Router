import type { Route } from "./+types/lendingStatusCreate";
import { LendingStatusCreatePage } from "../../views/pages/lendingStatus/LendingStatusCreatePage";
import { redirect } from "react-router";
import { createLendingStatus } from "~/services/LendingSetService";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString()
  if (name) {
    const insertResult = await createLendingStatus([{ name }]);

    return redirect(`/lendingStatuses/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingStatusCreate() {
  return <LendingStatusCreatePage />;
}

