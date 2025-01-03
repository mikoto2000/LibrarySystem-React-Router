import { Form, Link } from "react-router"

export const BookMasterCreatePage = () => {
  return (
    <main>
      <Form method="post">
        <div>
          <input type="text" name="isbn" placeholder="isbn" />
        </div>
        <div>
          <input type="text" name="name" placeholder="name" />
        </div>
        <div>
          <input type="date" name="publicationDate" placeholder="公開日" />
        </div>
        <div>
          <select multiple name="authors">
          </select>
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </Form>
      <Link to="../bookMasters">一覧に戻る</Link>
    </main>
  )
}

