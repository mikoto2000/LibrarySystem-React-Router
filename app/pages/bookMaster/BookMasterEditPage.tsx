import { Form, Link } from "react-router";

type BookMaster = {
  id: number,
  name: string,
};

type Author = {
  id: number,
  name: string,
};

type BookMasterEditPageProps = {
  bookMaster: BookMaster,
  authors: Author[],
}

export const BookMasterEditPage = ({ bookMaster, authors }: BookMasterEditPageProps) => {
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
          <select multiple name="authors">
            {
              authors.map((e) => <option value={e.id}>{e.name}</option>)
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


