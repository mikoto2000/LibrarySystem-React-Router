import { Form, Link } from "react-router";

type BookMaster = {
  id: number,
  name: string,
};

type BookMasterEditPageProps = {
  bookMaster: BookMaster,
}

export const BookMasterEditPage = ({ bookMaster }: BookMasterEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <label>Id: <input type="text" name="id" defaultValue={bookMaster.id} readOnly/></label>
        <label>Name: <input type="text" name="name" defaultValue={bookMaster.name}/></label>
        <button type="submit">変更</button>
      </Form>
      {" "}
      <Link to="/bookMasters">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


