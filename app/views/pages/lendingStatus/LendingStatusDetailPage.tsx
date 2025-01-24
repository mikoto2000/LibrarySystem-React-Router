import { Form, Link } from "react-router";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
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
      <div className="pl-1 pt-3 pb-1">
        <LinkButton label="編集する" to={`/lendingStatuses/${lendingStatus.id}/edit`} />
        {" "}
        <Form className="inline" method="post" action={`/lendingStatuses/${lendingStatus.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      {" "}
      <Link to="/lendingStatuses">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

