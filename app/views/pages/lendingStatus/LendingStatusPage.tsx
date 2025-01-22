import { Link } from "react-router";
import { Button } from "~/components/button/Button";
import { Table } from "~/components/table/Table";
import type { LendingStatus } from "~/types";

type LendingStatusPageProps = {
  lendingStatuses: LendingStatus[],
}

export const LendingStatusPage = ({ lendingStatuses }: LendingStatusPageProps) => {
  return (
    <main>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">LendingStatuses</h2>
        <Button
          label="新規作成"
          to="create"
        />
      </div>
      <Table<LendingStatus>
        linkTo="lendingStatuses"
        headerInfo={[
          {
            name: "Id",
            onClick: () => { },
          },
          {
            name: "Name",
            onClick: () => { },
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.name
          },
        ]}
        content={lendingStatuses}
      ></Table>
      <Link
        className="text-blue-600 dark:text-blue-500 hover:underline"
        to="/"
      >トップに戻る</Link>
      {
        import.meta.env.DEV
          ?
          <pre>
            {
              JSON.stringify(lendingStatuses, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
