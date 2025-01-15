import { Link } from "react-router";
import type { BookStockStatus } from "~/types";

type BookStockStatusPageProps = {
  bookStockStatuses: BookStockStatus[],
}

export const BookStockStatusPage = ({ bookStockStatuses }: BookStockStatusPageProps) => {
  return (
    <main>
      <h2>BookStockStatuses</h2>
      <Link to="create">新規登録</Link>
      <ul>
        {
          bookStockStatuses
            ?
            bookStockStatuses.map((e) => <li><Link to={`/bookStockStatuses/${e.id}`}>{e.id}: {e.name}</Link></li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
      <Link to="/">トップに戻る</Link>
      <pre>
        {
          JSON.stringify(bookStockStatuses, null, 2)
        }
      </pre>
    </main>
  )
}
