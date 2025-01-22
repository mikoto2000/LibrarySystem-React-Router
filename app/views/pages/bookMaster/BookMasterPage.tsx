import { Link } from "react-router";
import { Button } from "~/components/button/Button";
import { Table } from "~/components/table/Table";
import type { BookMasterList, BookMasterWithoutAuthors } from "~/views/types";

type BookMasterPageProps = {
  bookMasters: BookMasterList,
}

export const BookMasterPage = ({ bookMasters }: BookMasterPageProps) => {
  return (
    <main>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">BookMasters</h2>
        <Button
          label="新規作成"
          to="create"
        />
      </div>
      <Table<BookMasterWithoutAuthors>
        linkTo="lendingStatuses"
        headerInfo={[
          {
            name: "Id",
            onClick: () => { },
          },
          {
            name: "ISBN",
            onClick: () => { },
          },
          {
            name: "Book Name",
            onClick: () => { },
          },
          {
            name: "Publication Date",
            onClick: () => { },
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.isbn
          },
          {
            getValueFunc: (e) => e.name
          },
          {
            getValueFunc: (e) => e.publicationDate
          },
        ]}
        content={bookMasters}
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
              JSON.stringify(bookMasters, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
