import type { Route } from "./+types/lendingStatus";
import { LendingStatusPage } from "../../views/pages/lendingStatus/LendingStatusPage";
import type { LendingStatus } from "~/types";
import { lendingStatusRepository } from "~/di";

export async function loader() {
  const lendingStatuses: LendingStatus[] = await lendingStatusRepository.findAllLendingStatus();
  return { lendingStatuses };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <LendingStatusPage
    lendingStatuses={loaderData.lendingStatuses}
  />;
}

