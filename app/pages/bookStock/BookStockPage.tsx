import { Link } from "react-router";
import type { BookStock } from "~/types";

type BookStockPageProps = {
  bookStocks: any[],
}

export const BookStockPage = ({ bookStocks }: BookStockPageProps) => {
  return (
    <main>
      <h2>BookStocks</h2>
      <Link to="create">新規登録</Link>
      <ul>
        {
          bookStocks
            ?
            bookStocks.map((e) => <li><Link to={`/bookStocks/${e.book_stock.id}`}>{e.book_stock.id}: {e.bookMaster.name}, {e.book_stock_status.name}</Link></li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
      <Link to="/">トップに戻る</Link>
    </main>
  )
}
