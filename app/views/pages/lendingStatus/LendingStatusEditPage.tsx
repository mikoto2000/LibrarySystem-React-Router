import { Form, Link } from "react-router";
import type { LendingStatus } from "~/types";

type LendingStatusEditPageProps = {
  lendingStatus: LendingStatus,
}

export const LendingStatusEditPage = ({ lendingStatus }: LendingStatusEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <label>Id: <input type="text" name="id" defaultValue={lendingStatus.id} readOnly/></label>
        <label>Name: <input type="text" name="name" defaultValue={lendingStatus.name}/></label>
        <button type="submit">変更</button>
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


