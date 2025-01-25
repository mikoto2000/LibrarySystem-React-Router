import { Form } from "react-router";
import { DetailView } from "~/components/detailview/DetailView";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import type { LendingStatus } from "~/types";

type LendingStatusDetailPageProps = {
  lendingStatus: LendingStatus,
}

export const LendingStatusDetailPage = ({ lendingStatus }: LendingStatusDetailPageProps) => {
  return (
    <main>
      <h2 className="font-bold text-2xl mt-2 mb-1 ">LendingStatus</h2>
      <DetailView<LendingStatus>
        content={lendingStatus}
        valueInfos={[
          {
            name: "Id",
            getValueFunc: (e) => e.id.toString()
          },
          {
            name: "name",
            getValueFunc: (e) => e.name
          }
        ]}
      />
      <div className="pl-1 pt-3 pb-1">
        <LinkButton
          label="編集する"
          to={`/lendingStatuses/${lendingStatus.id}/edit`}
        />
        {" "}
        <Form className="inline" method="post" action={`/lendingStatuses/${lendingStatus.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      <div>
        <Link
          label="一覧へ戻る"
          to="/lendingStatuses" />
        {" "}
        <Link
          label="トップへ戻る"
          to="/" />
      </div>
      <pre>
        {
          import.meta.env.DEV
            ?
            JSON.stringify(lendingStatus, null, 2)
            :
            <></>
        }
      </pre>
    </main>
  )
}

