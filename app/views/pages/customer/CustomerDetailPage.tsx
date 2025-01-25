import { Form } from "react-router";
import { DetailView } from "~/components/detailview/DetailView";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { Customer } from "~/types";

type CustomerDetailPageProps = {
  customer: Customer,
}

export const CustomerDetailPage = ({ customer }: CustomerDetailPageProps) => {
  return (
    <main>
      <h2 className="font-bold text-2xl mt-2 mb-1 ">Customer</h2>
      <DetailView<Customer>
        content={customer}
        valueInfos={[
          {
            name: "Id",
            getValueFunc: (e) => e.id.toString()
          },
          {
            name: "name",
            getValueFunc: (e) => e.name
          },
          {
            name: "Email Address",
            getValueFunc: (e) => e.emailAddress
          }
        ]}
      />
      <div className="pl-1 pt-3 pb-1">
        <LinkButton
          label="編集する"
          to={`/customers/${customer.id}/edit`}
        />
        {" "}
        <Form className="inline" method="post" action={`/customers/${customer.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      <div>
        <Link
          label="一覧へ戻る"
          to="/customers" />
        {" "}
        <Link
          label="トップへ戻る"
          to="/" />
      </div>
      <pre>
        {
          import.meta.env.DEV
            ?
            JSON.stringify(customer, null, 2)
            :
            <></>
        }
      </pre>
    </main>
  )
}

