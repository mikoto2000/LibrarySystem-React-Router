import { Link } from "react-router";
import type { Customer } from "~/types";

type CustomerPageProps = {
  customeres: Customer[],
}

export const CustomerPage = ({ customeres }: CustomerPageProps) => {
  return (
    <main>
      <h2>Customeres</h2>
      <Link to="create">新規登録</Link>
      <ul>
        {
          customeres
            ?
            customeres.map((e) => <li><Link to={`/customers/${e.id}`}>{e.id}: {e.name}</Link></li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
      <Link to="/">トップに戻る</Link>
    </main>
  )
}
