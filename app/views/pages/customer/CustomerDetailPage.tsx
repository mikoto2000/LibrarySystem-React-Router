import { Form, Link } from "react-router";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { Customer } from "~/types";

type CustomerDetailPageProps = {
  customer: Customer,
}

export const CustomerDetailPage = ({ customer }: CustomerDetailPageProps) => {
  return (
    <main>
      <ul>
        <li>Id: {customer.id}</li>
        <li>Name: {customer.name}</li>
        <li>Email Address: {customer.emailAddress}</li>
      </ul>
      <Link to={`/customers/${customer.id}/edit`}>編集する</Link>
      {" "}
      <Form method="post" action={`/customers/${customer.id}/delete`}>
        <SubmitButton
          label="削除する"
        />
      </Form>
      {" "}
      <Link to="/customers">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

