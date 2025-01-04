import type { Route } from "./+types/customer";
import { CustomerDetailPage } from "../../pages/customer/CustomerDetailPage";
import { db } from "~/infra/db";
import { customerTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";

export async function loader({ params, request }: Route.LoaderArgs) {
  const id = params.id;
  const customer = (await db.select().from(customerTable).where(eq(customerTable.id, Number(id))))[0];
  return { customer };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CustomerDetail({ loaderData }: Route.ComponentProps) {
  return <CustomerDetailPage
    customer={loaderData.customer}
  />;
}

