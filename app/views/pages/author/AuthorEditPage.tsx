import { Form, Link } from "react-router";
import type { Author } from "~/types";

type AuthorEditPageProps = {
  author: Author,
}

export const AuthorEditPage = ({ author }: AuthorEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <label>Id: <input type="text" name="id" defaultValue={author.id} readOnly/></label>
        <label>Name: <input type="text" name="name" defaultValue={author.name}/></label>
        <button type="submit">変更</button>
      </Form>
      {" "}
      <Link to={`/authors/${author.id}`}>詳細へ戻る</Link>
      {" "}
      <Link to="/authors">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


