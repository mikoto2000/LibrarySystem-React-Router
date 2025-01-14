import { Form, Link } from "react-router";
import type { Author } from "~/types";

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
      <Form method="post" action={`/authors/${author.id}/delete`}>
        <button type="submit">削除する</button>
      </Form>
      {" "}
      <Link to="/authors">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

