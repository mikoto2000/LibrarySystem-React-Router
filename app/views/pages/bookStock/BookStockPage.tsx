import { Link } from "react-router";

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
            bookStocks.map((e) => <li><Link to={`/bookStocks/${e.id}`}>{e.id}: {e.bookMaster.name}, {e.bookStockStatus.name}</Link></li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
      <Link to="/">トップに戻る</Link>
      <pre>
        {
          JSON.stringify(bookStocks, null, 2)
        }
      </pre>
    </main>
  )
}
