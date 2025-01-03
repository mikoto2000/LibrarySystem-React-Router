import { Form, Link } from "react-router";
import type { BookStockStatus } from "~/types";

type BookStockStatusEditPageProps = {
  bookStockStatus: BookStockStatus,
}

export const BookStockStatusEditPage = ({ bookStockStatus }: BookStockStatusEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <label>Id: <input type="text" name="id" defaultValue={bookStockStatus.id} readOnly/></label>
        <label>Name: <input type="text" name="name" defaultValue={bookStockStatus.name}/></label>
        <button type="submit">変更</button>
      </Form>
      {" "}
      <Link to="/bookStockStatuses">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


