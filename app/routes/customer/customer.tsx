import type { Route } from "./+types/customer";
import { CustomerPage } from "../../pages/customer/CustomerPage";
import { db } from "~/infra/db";
import { customerTable } from "~/infra/db/schema";

export async function loader() {
  const customeres = await db.select().from(customerTable);
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

