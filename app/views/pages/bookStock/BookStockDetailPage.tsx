import { Form } from "react-router";
import { DetailView } from "~/components/detailview/DetailView";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { BookStockWithoutAuthor } from "~/views/types";

type BookStockDetailPageProps = {
  bookStock: BookStockWithoutAuthor,
}

export const BookStockDetailPage = ({ bookStock }: BookStockDetailPageProps) => {
  return (
    <main>
      <DetailView<BookStockWithoutAuthor>
        content={bookStock}
        valueInfos={[
          {
            name: "Id",
            getValueFunc: (e) => e.id.toString()
          },
          {
            name: "Book Name",
            getValueFunc: (e) => e.bookMaster.name
          },
          {
            name: "Status",
            getValueFunc: (e) => e.bookStockStatus.name
          },
          {
            name: "Memo",
            getValueFunc: (e) => e.memo
          },
        ]}
      />
      <div className="pl-1 pt-3 pb-1">
        <LinkButton label="編集する" to={`/bookStocks/${bookStock.id}/edit`} />
        {" "}
        <Form className="inline" method="post" action={`/bookStocks/${bookStock.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      {" "}
      <div>
        <Link
          label="一覧へ戻る"
          to="/authors" />
        {" "}
        <Link
          label="トップへ戻る"
          to="/" />
      </div>
      <pre>
        {
          import.meta.env.DEV
            ?
            JSON.stringify(bookStock, null, 2)
            :
            <></>
        }
      </pre>
    </main>
  )
}

