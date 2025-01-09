import type { Route } from "./+types/customerEdit";
import { CustomerEditPage } from "../../pages/customer/CustomerEditPage";
import { db } from "~/infra/db";
import { customerTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";
import type { Customer } from "~/types";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const insertResult = await db.update(customerTable)
      .set({ name })
      .where(eq(customerTable.id, Number(id)))
      .returning();

    return redirect(`/customers/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const customer: Customer = (await db.select().from(customerTable).where(eq(customerTable.id, Number(id))))[0];

  return { customer };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CustomerEdit({ loaderData }: Route.ComponentProps) {
  return <CustomerEditPage
    customer={loaderData.customer}
  />;
}

