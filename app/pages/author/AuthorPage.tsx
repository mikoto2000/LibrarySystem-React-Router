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
      <Link to="create">新規登録</Link>
      <ul>
        {
          authors
            ?
            authors.map((e) => <li>{e.id}: {e.name}</li>)
            :
            <>表示要素がありませんでした</>
        }
      </ul>
    </main>
  )
}
