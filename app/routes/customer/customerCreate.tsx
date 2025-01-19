import type { Route } from "./+types/customerCreate";
import { CustomerCreatePage } from "../../views/pages/customer/CustomerCreatePage";
import { redirect } from "react-router";
import { customerRepository } from "~/di";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString()
  const emailAddress = formData.get("emailAddress")?.toString()
  if (name && emailAddress) {
    const insertResult = await customerRepository.createCustomer([{ name, emailAddress }]);

    return redirect(`/customers/${insertResult[0].id}`);
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

export default function CustomerCreate() {
  return <CustomerCreatePage />;
}

