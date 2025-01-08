import { Link } from "react-router";
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
        <li>Authors: {bookMaster.authors.map((e) => `${e.id}: ${e.name}`).join(", ")}</li>
      </ul>
      <Link to={`/bookMasters/${bookMaster.id}/edit`}>編集する</Link>
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

