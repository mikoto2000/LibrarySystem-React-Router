import { Form, Link } from "react-router";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { BookStockWithoutAuthor } from "~/views/types";

type BookStockDetailPageProps = {
  bookStock: BookStockWithoutAuthor,
}

export const BookStockDetailPage = ({ bookStock }: BookStockDetailPageProps) => {
  return (
    <main>
      <ul>
        <li>Id: {bookStock.id}</li>
        <li>Book Name: {bookStock.bookMaster.name}</li>
        <li>Status: {bookStock.bookStockStatus.name}</li>
        <li>Memo: {bookStock.memo}</li>
      </ul>
      <Link to={`/bookStocks/${bookStock.id}/edit`}>編集する</Link>
      {" "}
      <Form method="post" action={`/bookStocks/${bookStock.id}/delete`}>
        <SubmitButton
          label="削除する"
        />
      </Form>
      {" "}
      <Link to="/bookStocks">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
      <pre>
        {
          JSON.stringify(bookStock, null, 2)
        }
      </pre>
    </main>
  )
}

