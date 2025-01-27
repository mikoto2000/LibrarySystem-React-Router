import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { Table } from "~/components/table/Table";
import type { BookStockWithoutAuthor } from "~/views/types";

type BookStockPageProps = {
  bookStocks: BookStockWithoutAuthor[],
}

export const BookStockPage = ({ bookStocks }: BookStockPageProps) => {
  return (
    <main>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">BookStocks</h2>
        <LinkButton
          label="新規作成"
          to="create"
        />
      </div>
      <Table<any>
        linkTo="bookStocks"
        headerInfo={[
          {
            name: "Id",
            onClick: () => { },
          },
          {
            name: "Name",
            onClick: () => { },
          },
          {
            name: "Status",
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
            getValueFunc: (e) => e.bookMaster.name
          },
          {
            getValueFunc: (e) => e.bookStockStatus.name
          },
          {
            getValueFunc: (e) => e.memo
          },
        ]}
        content={bookStocks}
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
              JSON.stringify(bookStocks, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
