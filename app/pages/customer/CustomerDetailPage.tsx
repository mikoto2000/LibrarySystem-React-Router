import { Link } from "react-router";
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
      <Link to="/customers">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

