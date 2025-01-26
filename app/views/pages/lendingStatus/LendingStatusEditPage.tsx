import { Form } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import type { LendingStatus } from "~/types";

type LendingStatusEditPageProps = {
  lendingStatus: LendingStatus,
}

export const LendingStatusEditPage = ({ lendingStatus }: LendingStatusEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <div>
          <LabelAndInput
            label="Id"
            inputType="text"
            inputName="id"
            inputDefaultValue={lendingStatus.id}
            readOnly
          />
        </div>
        <div>
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={lendingStatus.name}
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
      <Link label="詳細へ戻る" to={`/lendingStatuses/${lendingStatus.id}`}></Link>
      {" "}
      <Link label="一覧へ戻る" to="/lendingStatuses"></Link>
      {" "}
      <Link label="トップへ戻る" to="/"></Link>
    </main>
  )
}


