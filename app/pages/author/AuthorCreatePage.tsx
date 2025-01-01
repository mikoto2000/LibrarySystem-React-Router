import { Form, Link } from "react-router"

export const AuthorCreatePage = () => {
  return (
    <main>
      <Form method="post">
        <input type="text" name="name" placeholder="name"/>
        <button type="submit">登録</button>
      </Form>
      <Link to="../authors">一覧に戻る</Link>
    </main>
  )
}

