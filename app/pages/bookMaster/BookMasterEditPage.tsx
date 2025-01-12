import { Form, Link } from "react-router";
import type { Author, BookMaster } from "~/types";

type BookMasterEditPageProps = {
  bookMaster: BookMaster,
  authors: Author[],
}

export const BookMasterEditPage = ({ bookMaster, authors }: BookMasterEditPageProps) => {
  const authorIds = bookMaster.authors.map((e) => e.id)
  return (
    <main>
      <Form method="post" name="edit">
        <div>
          <label>Id: <input type="text" name="id" defaultValue={bookMaster.id} readOnly /></label>
        </div>
        <div>
          <label>Name: <input type="text" name="name" defaultValue={bookMaster.name} /></label>
        </div>
        <div>
          <select multiple name="authorIds">
            {
              authors.map((e) => <option selected={authorIds.includes(e.id)} value={e.id}>{e.name}</option>)
            }
          </select>
        </div>
        <button type="submit">変更</button>
      </Form>
      {" "}
      <Link to="/bookMasters">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


