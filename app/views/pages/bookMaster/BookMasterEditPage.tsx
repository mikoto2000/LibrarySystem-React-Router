import { Form, Link } from "react-router";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
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
          <label>Isbn: <input type="text" name="isbn" defaultValue={bookMaster.isbn} /></label>
        </div>
        <div>
          <label>Name: <input type="text" name="name" defaultValue={bookMaster.name} /></label>
        </div>
        <div>
          <label>Publication Date: <input type="date" name="publicationDate" defaultValue={bookMaster.publicationDate} /></label>
        </div>
        <div>
          <select multiple name="authorIds">
            {
              authors.map((e) => <option selected={authorIds.includes(e.id)} value={e.id}>{e.name}</option>)
            }
          </select>
        </div>
        <SubmitButton
          label="変更"
        />
      </Form>
      {" "}
      <Link to={`/bookMasters/${bookMaster.id}`}>詳細へ戻る</Link>
      {" "}
      <Link to="/bookMasters">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


