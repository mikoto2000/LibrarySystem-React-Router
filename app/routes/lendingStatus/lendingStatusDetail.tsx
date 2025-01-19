import type { Route } from "./+types/lendingStatusDetail";
import { LendingStatusDetailPage } from "../../views/pages/lendingStatus/LendingStatusDetailPage";

import { lendingStatusRepository } from "~/di";

export async function loader({ params, request }: Route.LoaderArgs) {
  const id = params.id;
  const lendingStatus = await lendingStatusRepository.findLendingStatusById(Number(id));
  return { lendingStatus };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LendingStatusDetail({ loaderData }: Route.ComponentProps) {
  return <LendingStatusDetailPage
    lendingStatus={loaderData.lendingStatus}
  />;
}

