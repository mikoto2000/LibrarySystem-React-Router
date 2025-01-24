import { Form, Link } from "react-router";
import { LinkButton } from "~/components/linkbutton/LinkButton";
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
      <div className="pl-1 pt-3 pb-1">
        <LinkButton label="編集する" to={`/customers/${customer.id}/edit`} />
        {" "}
        <Form className="inline" method="post" action={`/customers/${customer.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      {" "}
      <Link to="/customers">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

