import { Form, Link } from "react-router";
import { LinkButton } from "~/components/linkbutton/LinkButton";
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
      <div className="pl-1 pt-3 pb-1">
        <LinkButton label="編集する" to={`/lendingSets/${lendingSet.id}/edit`} />
        {" "}
        <Form className="inline" method="post" action={`/lendingSets/${lendingSet.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      {" "}
      <Link to="/lendingSets">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

