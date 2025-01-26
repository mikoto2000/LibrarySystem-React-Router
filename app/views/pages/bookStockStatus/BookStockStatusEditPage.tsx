import { Form } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { BookStockStatus } from "~/types";

type BookStockStatusEditPageProps = {
  bookStockStatus: BookStockStatus,
}

export const BookStockStatusEditPage = ({ bookStockStatus }: BookStockStatusEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <div>
          <LabelAndInput
            label="Id"
            inputType="text"
            inputName="id"
            inputDefaultValue={bookStockStatus.id}
            readOnly
          />
        </div>
        <div>
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={bookStockStatus.name}
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
      <Link label="詳細へ戻る" to={`/bookStockStatuses/${bookStockStatus.id}`}></Link>
      {" "}
      <Link label="一覧へ戻る" to="/bookStockStatuses"></Link>
      {" "}
      <Link label="トップへ戻る" to="/"></Link>
    </main>
  )
}


