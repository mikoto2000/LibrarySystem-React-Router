import { Form, Link } from "react-router";
import type { BookStockStatus } from "~/types";

type BookStockStatusDetailPageProps = {
  bookStockStatus: BookStockStatus,
}

export const BookStockStatusDetailPage = ({ bookStockStatus }: BookStockStatusDetailPageProps) => {
  return (
    <main>
      <ul>
        <li>Id: {bookStockStatus.id}</li>
        <li>Name: {bookStockStatus.name}</li>
      </ul>
      <Link to={`/bookStockStatuses/${bookStockStatus.id}/edit`}>編集する</Link>
      {" "}
      <Form method="post" action={`/bookStockStatuses/${bookStockStatus.id}/delete`}>
        <button type="submit">削除する</button>
      </Form>
      {" "}
      <Link to="/bookStockStatuses">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

