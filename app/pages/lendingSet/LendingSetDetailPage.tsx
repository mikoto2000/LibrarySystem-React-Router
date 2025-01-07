import { Link } from "react-router";
import type { LendingSet } from "~/types";

type LendingSetDetailPageProps = {
  lendingSet: LendingSet,
}

export const LendingSetDetailPage = ({ lendingSet }: LendingSetDetailPageProps) => {
  return (
    <main>
      <pre>
        {
          JSON.stringify(lendingSet, null, 2)
        }
      </pre>
      <Link to={`/lendingSets/${lendingSet.id}/edit`}>編集する</Link>
      {" "}
      <Link to="/lendingSets">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

