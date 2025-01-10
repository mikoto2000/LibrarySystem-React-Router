import { Link } from "react-router";
import type { LendingSetList } from "~/views/types";

type LendingSetPageProps = {
  lendingSets: LendingSetList,
}

export const LendingSetPage = ({ lendingSets }: LendingSetPageProps) => {
  return (
    <main>
      <h2>LendingSets</h2>
      <Link to="create">新規登録</Link>
      <Link to="/">トップに戻る</Link>
      <pre>
       {
         JSON.stringify(lendingSets, null, 2)
       }
      </pre>
    </main>
  )
}
