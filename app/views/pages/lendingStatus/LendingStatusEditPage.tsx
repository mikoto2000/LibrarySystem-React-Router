import { Form, Link } from "react-router";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import type { LendingStatus } from "~/types";

type LendingStatusEditPageProps = {
  lendingStatus: LendingStatus,
}

export const LendingStatusEditPage = ({ lendingStatus }: LendingStatusEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <label>Id: <input type="text" name="id" defaultValue={lendingStatus.id} readOnly /></label>
        <label>Name: <input type="text" name="name" defaultValue={lendingStatus.name} /></label>
        <SubmitButton
          label="変更"
        />
      </Form>
      {" "}
      <Link to={`/lendingStatuses/${lendingStatus.id}`}>詳細へ戻る</Link>
      {" "}
      <Link to="/lendingStatuses">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


