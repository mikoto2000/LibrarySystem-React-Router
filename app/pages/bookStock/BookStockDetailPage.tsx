import { Link } from "react-router";
import type { BookStock } from "~/types";

type BookStockDetailPageProps = {
  bookStock: BookStock,
}

export const BookStockDetailPage = ({ bookStock }: BookStockDetailPageProps) => {
  return (
    <main>
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

