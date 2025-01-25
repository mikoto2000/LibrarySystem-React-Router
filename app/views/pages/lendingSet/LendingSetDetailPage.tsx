import { Form } from "react-router";
import { DetailView } from "~/components/detailview/DetailView";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import type { LendingSet } from "~/views/types";

type LendingSetDetailPageProps = {
  lendingSet: LendingSet,
}

export const LendingSetDetailPage = ({ lendingSet }: LendingSetDetailPageProps) => {
  return (
    <main>
      <h2 className="font-bold text-2xl mt-2 mb-1 ">LendingSet</h2>
      <DetailView<LendingSet>
        content={lendingSet}
        valueInfos={[
          {
            name: "Id",
            getValueFunc: (e) => e.id.toString()
          },
          {
            name: "Status",
            getValueFunc: (e) => e.lendingStatus.name
          },
          {
            name: "Books",
            getValueFunc: (e) => e.bookStocks.map((b) => {
              return b.id + ": " + b.bookMaster.name
              }).join(", ")
          },
          {
            name: "Lend Start Date",
            getValueFunc: (e) => e.lendStartDate
          },
          {
            name: "Lend Deadline Date",
            getValueFunc: (e) => e.lendDeadlineDate
          },
          {
            name: "Return Date",
            getValueFunc: (e) => e.returnDate ? e.returnDate : ""
          },
          {
            name: "Memo",
            getValueFunc: (e) => e.memo ? e.memo : ""
          },
        ]}
      />
      <div className="pl-1 pt-3 pb-1">
        <LinkButton
          label="編集する"
          to={`/lendingSets/${lendingSet.id}/edit`}
        />
        {" "}
        <Form className="inline" method="post" action={`/lendingSets/${lendingSet.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      <div>
        <Link
          label="一覧へ戻る"
          to="/lendingSets" />
        {" "}
        <Link
          label="トップへ戻る"
          to="/" />
      </div>
      <pre>
        {
          import.meta.env.DEV
            ?
            JSON.stringify(lendingSet, null, 2)
            :
            <></>
        }
      </pre>
    </main>
  )
}

