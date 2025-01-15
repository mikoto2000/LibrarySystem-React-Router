import { Form, Link } from "react-router";
import type { LendingStatus } from "~/types";

type LendingStatusDetailPageProps = {
  lendingStatus: LendingStatus,
}

export const LendingStatusDetailPage = ({ lendingStatus }: LendingStatusDetailPageProps) => {
  return (
    <main>
      <ul>
        <li>Id: {lendingStatus.id}</li>
        <li>Name: {lendingStatus.name}</li>
      </ul>
      <Link to={`/lendingStatuses/${lendingStatus.id}/edit`}>編集する</Link>
      {" "}
      <Form method="post" action={`/lendingStatuses/${lendingStatus.id}/delete`}>
        <button type="submit">削除する</button>
      </Form>
      {" "}
      <Link to="/lendingStatuses">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}
