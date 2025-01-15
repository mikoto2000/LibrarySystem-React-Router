import { Link } from "react-router";
import type { BookMasterList } from "~/views/types";

type BookMasterPageProps = {
  bookMasters: BookMasterList,
}

export const BookMasterPage = ({ bookMasters }: BookMasterPageProps) => {
  return (
    <main>
      <h2>BookMasters</h2>
      <Link to="create">新規登録</Link>
      <ul>
        {
          bookMasters
            ?
            bookMasters.map((e) => <li><Link to={`/bookMasters/${e.id}`}>{e.id}: {e.name}</Link></li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
      <Link to="/">トップに戻る</Link>
      <pre>
        {
          JSON.stringify(bookMasters, null, 2)
        }
      </pre>
    </main>
  )
}
