import { Form, Link } from "react-router";
import type { Customer } from "~/types";

type CustomerEditPageProps = {
  customer: Customer,
}

export const CustomerEditPage = ({ customer }: CustomerEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <div>
          <label>Id: <input type="text" name="id" defaultValue={customer.id} readOnly /></label>
        </div>
        <div>
          <label>Name: <input type="text" name="name" defaultValue={customer.name} /></label>
        </div>
        <div>
          <label>Email Address: <input type="text" name="emailAddress" defaultValue={customer.emailAddress} /></label>
        </div>
        <button type="submit">変更</button>
      </Form>
      {" "}
      <Link to="/customers">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


