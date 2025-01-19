import type { Route } from "./+types/lendingSet";
import { LendingSetPage } from "../../views/pages/lendingSet/LendingSetPage";
import { lendingSetRepository } from "~/di";

export async function loader() {

  const lendingSets = await lendingSetRepository.findAllLendingSet();
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

