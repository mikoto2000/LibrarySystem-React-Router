import { Link } from "react-router";
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
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to="create">新規登録</Link>
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
      <Link to="/">トップに戻る</Link>
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
