import { Link } from "react-router";
import type { BookStock } from "~/types";

type BookStockDetailPageProps = {
  bookStock: BookStock,
}

export const BookStockDetailPage = ({ bookStock }: BookStockDetailPageProps) => {
  return (
    <main>
      <ul>
        <li>Id: {bookStock.id}</li>
        <li>Book Name: {bookStock.bookMaster.name}</li>
        <li>Status: {bookStock.bookStockStatus.name}</li>
      </ul>
      <Link to={`/bookStocks/${bookStock.id}/edit`}>編集する</Link>
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

