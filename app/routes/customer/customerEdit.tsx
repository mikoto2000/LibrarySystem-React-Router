import type { Route } from "./+types/customerEdit";
import { CustomerEditPage } from "../../views/pages/customer/CustomerEditPage";
import { redirect } from "react-router";

import { customerRepository } from "~/di";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  const emailAddress = formData.get("emailAddress")?.toString()
  if (id && name && emailAddress) {
    const insertResult = await customerRepository.updateCustomer(Number(id), { name, emailAddress });

    return redirect(`/customers/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const customer = await customerRepository.findCustomerById(Number(id))
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

