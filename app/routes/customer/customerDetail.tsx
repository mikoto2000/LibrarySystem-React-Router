import type { Route } from "./+types/customerDetail";
import { CustomerDetailPage } from "../../views/pages/customer/CustomerDetailPage";

import { customerRepository } from "~/di";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const customer = await customerRepository.findCustomerById(Number(id));
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

