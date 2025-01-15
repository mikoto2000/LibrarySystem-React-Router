import { Form, Link } from "react-router"
import type { Author } from "~/types"

type BookMasterCreatePageProps = {
  authors: Author[],
}

export const BookMasterCreatePage = ({ authors }: BookMasterCreatePageProps) => {
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
            {
              authors.map((e) => <option value={e.id}>{e.name}</option>)
            }
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

