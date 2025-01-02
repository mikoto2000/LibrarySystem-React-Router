import { Link } from "react-router";

type Author = {
  id: number,
  name: string,
};

type AuthorPageProps = {
  authors: Author[],
}

export const AuthorPage = ({ authors }: AuthorPageProps) => {
  return (
    <main>
      <h2>Authors</h2>
      <Link to="create">新規登録</Link>
      <ul>
        {
          authors
            ?
            authors.map((e) => <li><Link to={`/authors/${e.id}`}>{e.id}: {e.name}</Link></li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
      <Link to="/">トップに戻る</Link>
    </main>
  )
}
