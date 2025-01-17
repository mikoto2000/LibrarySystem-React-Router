import type { Route } from "./+types/customerDelete";

import { redirect } from "react-router";
import { deleteCustomer } from "~/services/CustomerService";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await deleteCustomer(Number(id));

    return redirect(`/customers`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}


