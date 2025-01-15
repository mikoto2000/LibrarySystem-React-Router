import type { Route } from "./+types/lendingStatusCreate";
import { LendingStatusCreatePage } from "../../views/pages/lendingStatus/LendingStatusCreatePage";
import { db } from "~/infra/db";
import { lendingStatusTable } from "~/infra/db/schema";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString()
  if (name) {
    const lendingStatus: typeof lendingStatusTable.$inferInsert = {
      name,
    };
    const insertResult = await db.insert(lendingStatusTable).values(lendingStatus).returning();

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

