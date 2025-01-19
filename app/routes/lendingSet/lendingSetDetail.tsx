import type { Route } from "./+types/lendingSetDetail";
import { LendingSetDetailPage } from "../../views/pages/lendingSet/LendingSetDetailPage";

import { lendingSetRepository } from "~/di";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const lendingSet = await lendingSetRepository.findLendingSetById(Number(id));

  return { lendingSet };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingSetDetail({ loaderData }: Route.ComponentProps) {
  return <LendingSetDetailPage
    lendingSet={loaderData.lendingSet}
  />;
}

