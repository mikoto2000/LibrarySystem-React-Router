import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { Table } from "~/components/table/Table";
import type { BookStockStatus } from "~/types";

type BookStockStatusPageProps = {
  bookStockStatuses: BookStockStatus[],
}

export const BookStockStatusPage = ({ bookStockStatuses }: BookStockStatusPageProps) => {
  return (
    <main>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">BookStockStatuses</h2>
        <LinkButton
          label="新規作成"
          to="create"
        />
      </div>
      <Table<BookStockStatus>
        linkTo="bookStockStatuses"
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
        content={bookStockStatuses}
      ></Table>
      <Link
        label="トップに戻る"
        to="/"
      ></Link>
      {
        import.meta.env.DEV
          ?
          <pre>
            {
              JSON.stringify(bookStockStatuses, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
