import { Form, Link } from "react-router";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
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
        <SubmitButton
          label="削除する"
        />
      </Form>
      {" "}
      <Link to="/bookStockStatuses">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

