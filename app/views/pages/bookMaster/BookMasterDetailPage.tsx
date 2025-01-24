import { Form, Link } from "react-router";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { BookMaster } from "~/types";

type BookMasterDetailPageProps = {
  bookMaster: BookMaster,
}

export const BookMasterDetailPage = ({ bookMaster }: BookMasterDetailPageProps) => {
  return (
    <main>
      <ul>
        <li>Id: {bookMaster.id}</li>
        <li>Isbn: {bookMaster.isbn}</li>
        <li>Name: {bookMaster.name}</li>
        <li>Publication Date: {bookMaster.publicationDate}</li>
        <li>Authors: {bookMaster.authors.map((e) => `${e.id}: ${e.name}`).join(", ")}</li>
      </ul>
      <Link to={`/bookMasters/${bookMaster.id}/edit`}>編集する</Link>
      {" "}
      <Form method="post" action={`/bookMasters/${bookMaster.id}/delete`}>
        <SubmitButton
          label="削除する"
        />
      </Form>
      {" "}
      <Link to="/bookMasters">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
      <pre>
        {
          JSON.stringify(bookMaster, null, 2)
        }
      </pre>
    </main>
  )
}

