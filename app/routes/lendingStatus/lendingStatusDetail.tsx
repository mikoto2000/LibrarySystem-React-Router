import type { Route } from "./+types/lendingStatusDetail";
import { LendingStatusDetailPage } from "../../views/pages/lendingStatus/LendingStatusDetailPage";
import { db } from "~/infra/db";
import { lendingStatusTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";

export async function loader({ params, request }: Route.LoaderArgs) {
  const id = params.id;
  const lendingStatus = (await db.select().from(lendingStatusTable).where(eq(lendingStatusTable.id, Number(id))))[0];
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

