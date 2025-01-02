import { Link } from "react-router";

type Author = {
  id: number,
  name: string,
};

type AuthorDetailPageProps = {
  author: Author,
}

export const AuthorDetailPage = ({ author }: AuthorDetailPageProps) => {
  return (
    <main>
      <ul>
        <li>Id: {author.id}</li>
        <li>Name: {author.name}</li>
      </ul>
      <Link to={`/authors/${author.id}/edit`}>編集する</Link>
      {" "}
      <Link to="/authors">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

