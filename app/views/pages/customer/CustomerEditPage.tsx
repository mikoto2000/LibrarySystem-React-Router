import { Form, Link } from "react-router";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
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
        <SubmitButton
          label="変更"
        />
      </Form>
      {" "}
      <Link to={`/customers/${customer.id}`}>詳細へ戻る</Link>
      {" "}
      <Link to="/customers">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


