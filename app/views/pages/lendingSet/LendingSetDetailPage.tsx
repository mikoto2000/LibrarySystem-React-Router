import { Form, Link } from "react-router";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import type { LendingSet } from "~/views/types";

type LendingSetDetailPageProps = {
  lendingSet: LendingSet,
}

export const LendingSetDetailPage = ({ lendingSet }: LendingSetDetailPageProps) => {
  return (
    <main>
      <pre>
        {
          JSON.stringify(lendingSet, null, 2)
        }
      </pre>
      <Link to={`/lendingSets/${lendingSet.id}/edit`}>編集する</Link>
      {" "}
      <Form method="post" action={`/lendingSets/${lendingSet.id}/delete`}>
        <SubmitButton
          label="削除する"
        />
      </Form>
      {" "}
      <Link to="/lendingSets">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

