import { Link } from "react-router";
import { Button } from "~/components/button/Button";
import { Table } from "~/components/table/Table";
import type { LendingSetList, LendingSetWithoutAuthor } from "~/views/types";

type LendingSetPageProps = {
  lendingSets: LendingSetList,
}

export const LendingSetPage = ({ lendingSets }: LendingSetPageProps) => {
  return (
    <main>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">LendingSets</h2>
        <Button
          label="新規作成"
          to="create"
        />
      </div>
      <Table<LendingSetWithoutAuthor>
        linkTo="lendingSets"
        headerInfo={[
          {
            name: "Id",
            onClick: () => { },
          },
          {
            name: "Status",
            onClick: () => { },
          },
          {
            name: "Customer",
            onClick: () => { },
          },
          {
            name: "Lend Start Date",
            onClick: () => { },
          },
          {
            name: "Lend Deadline Date",
            onClick: () => { },
          },
          {
            name: "Return Date",
            onClick: () => { },
          },
          {
            name: "Books",
            onClick: () => { },
          },
          {
            name: "Memo",
            onClick: () => { },
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.lendingStatus.name
          },
          {
            getValueFunc: (e) => e.customer
          },
          {
            getValueFunc: (e) => e.lendStartDate
          },
          {
            getValueFunc: (e) => e.lendDeadlineDate
          },
          {
            getValueFunc: (e) => e.returnDate
          },
          {
            getValueFunc: (e) => e.bookStocks.join(", ")
          },
          {
            getValueFunc: (e) => e.memo ? e.memo : ""
          },
        ]}
        content={lendingSets}
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
              JSON.stringify(lendingSets, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
