import type { Route } from "./+types/lendingStatus";
import { LendingStatusEditPage } from "../../pages/lendingStatus/LendingStatusEditPage";
import { db } from "~/infra/db";
import { lendingStatusTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const insertResult = await db.update(lendingStatusTable)
      .set({ name })
      .where(eq(lendingStatusTable.id, Number(id)))
      .returning();

    return redirect(`/lendingStatuses/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
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

export default function LendingStatusEdit({ loaderData }: Route.ComponentProps) {
  return <LendingStatusEditPage
    lendingStatus={loaderData.lendingStatus}
  />;
}

