import type { Route } from "./+types/lendingStatus";
import { LendingStatusPage } from "../../views/pages/lendingStatus/LendingStatusPage";
import { db } from "~/infra/db";
import { lendingStatusTable } from "~/infra/db/schema";
import type { LendingStatus } from "~/types";
import { findAllLendingStatus } from "~/services/LendingSetService";

export async function loader() {
  const lendingStatuses: LendingStatus[] = await findAllLendingStatus();
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

