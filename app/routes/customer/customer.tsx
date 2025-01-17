import type { Route } from "./+types/customer";
import { CustomerPage } from "../../views/pages/customer/CustomerPage";
import type { Customer } from "~/types";
import { findAllCustomer } from "~/services/CustomerService";

export async function loader() {
  const customeres: Customer[] = await findAllCustomer();
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

