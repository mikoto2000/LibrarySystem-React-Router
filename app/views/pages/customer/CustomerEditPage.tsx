import { Form } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
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
          <LabelAndInput
            label="Id"
            inputType="text"
            inputName="id"
            inputDefaultValue={customer.id}
            readOnly
          />
        </div>
        <div>
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={customer.name}
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="Email Address"
            inputType="text"
            inputName="emailAddress"
            inputDefaultValue={customer.emailAddress}
            required
          />
        </div>
        <div className="pt-2" >
          <SubmitButton
            label="変更"
          />
        </div>
      </Form>
      {" "}
      <Link label="詳細へ戻る" to={`/customers/${customer.id}`}></Link>
      {" "}
      <Link label="一覧へ戻る" to="/customers"></Link>
      {" "}
      <Link label="トップへ戻る" to="/"></Link>
    </main>
  )
}


