import { Form, Link } from "react-router"

export const CustomerCreatePage = () => {
  return (
    <main>
      <Form method="post">
        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="emailAddress" placeholder="emailAddress"/>
        <button type="submit">登録</button>
      </Form>
      <Link to="../customers">一覧に戻る</Link>
    </main>
  )
}

