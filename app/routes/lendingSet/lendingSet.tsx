import type { Route } from "./+types/lendingSet";
import { LendingSetPage } from "../../views/pages/lendingSet/LendingSetPage";
import { findAllLendingSet } from "~/services/LendingSetService";

export async function loader() {

  const lendingSets = await findAllLendingSet();
  return { lendingSets };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <LendingSetPage
    lendingSets={loaderData.lendingSets}
  />;
}

