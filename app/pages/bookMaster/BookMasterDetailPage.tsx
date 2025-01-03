import { Link } from "react-router";

type BookMaster = {
  id: number,
  name: string,
};

type BookMasterDetailPageProps = {
  bookMaster: BookMaster,
}

export const BookMasterDetailPage = ({ bookMaster }: BookMasterDetailPageProps) => {
  return (
    <main>
      <ul>
        <li>Id: {bookMaster.id}</li>
        <li>Name: {bookMaster.name}</li>
      </ul>
      <Link to={`/bookMasters/${bookMaster.id}/edit`}>編集する</Link>
      {" "}
      <Link to="/bookMasters">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}

