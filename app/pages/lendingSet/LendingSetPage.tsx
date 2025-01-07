import { Link } from "react-router";
import type { LendingSet } from "~/types";

type LendingSetPageProps = {
  lendingSets: LendingSet[],
}

export const LendingSetPage = ({ lendingSets }: LendingSetPageProps) => {
  return (
    <main>
      <h2>LendingSets</h2>
      <Link to="create">新規登録</Link>
      <ul>
        {
          lendingSets
            ?
            lendingSets.map((e) => <li><Link to={`/lendingSets/${e.id}`}>{e.id}: </Link></li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
      <Link to="/">トップに戻る</Link>
      <pre>
       {
         JSON.stringify(lendingSets, null, 2)
       }
      </pre>
    </main>
  )
}
