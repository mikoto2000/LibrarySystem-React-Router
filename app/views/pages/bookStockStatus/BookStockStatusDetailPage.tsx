import { Form, Link } from "react-router";
import { LinkButton } from "~/components/linkbutton/LinkButton";
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
      <div className="pl-1 pt-3 pb-1">
        <LinkButton label="編集する" to={`/bookStockStatuses/${bookStockStatus.id}/edit`} />
        {" "}
        <Form className="inline" method="post" action={`/bookStockStatuses/${bookStockStatus.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      {" "}
      <Link to="/bookStockStatuses">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

