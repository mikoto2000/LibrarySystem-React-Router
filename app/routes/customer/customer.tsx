import type { Route } from "./+types/customer";
import { CustomerPage } from "../../views/pages/customer/CustomerPage";
import { db } from "~/infra/db";
import { customerTable } from "~/infra/db/schema";
import type { Customer } from "~/types";

export async function loader() {
  const customeres: Customer[] = await db.select().from(customerTable);
  return { customeres };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <CustomerPage
    customeres={loaderData.customeres}
  />;
}

