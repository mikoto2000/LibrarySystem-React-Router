import type { Route } from "./+types/lendingStatusEdit";
import { LendingStatusEditPage } from "../../views/pages/lendingStatus/LendingStatusEditPage";
import { redirect } from "react-router";
import { findLendingStatusById, updateLendingStatus } from "~/services/LendingSetService";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const insertResult = await updateLendingStatus(Number(id), { name });

    return redirect(`/lendingStatuses/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const lendingStatus = await findLendingStatusById(Number(id));

  return { lendingStatus };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingStatusEdit({ loaderData }: Route.ComponentProps) {
  return <LendingStatusEditPage
    lendingStatus={loaderData.lendingStatus}
  />;
}

