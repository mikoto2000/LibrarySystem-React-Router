import { Link } from "react-router";
import type { LendingStatus } from "~/types";

type LendingStatusPageProps = {
  lendingStatuses: LendingStatus[],
}

export const LendingStatusPage = ({ lendingStatuses }: LendingStatusPageProps) => {
  return (
    <main>
      <h2>LendingStatuses</h2>
      <Link to="create">新規登録</Link>
      <ul>
        {
          lendingStatuses
            ?
            lendingStatuses.map((e) => <li><Link to={`/lendingStatuses/${e.id}`}>{e.id}: {e.name}</Link></li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
      <Link to="/">トップに戻る</Link>
    </main>
  )
}
