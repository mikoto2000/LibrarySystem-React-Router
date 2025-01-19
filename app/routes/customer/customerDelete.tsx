import type { Route } from "./+types/customerDelete";

import { redirect } from "react-router";
import { customerRepository } from "~/di";

export async function action({ params }: Route.ActionArgs) {
  const id = params.id;
  if (id) {
    await customerRepository.deleteCustomer(Number(id));

    return redirect(`/customers`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}


