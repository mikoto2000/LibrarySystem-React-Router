import { Link, useNavigate } from "react-router";
import { Table } from "~/components/table/Table";
import type { Author } from "~/types";

type AuthorPageProps = {
  authors: Author[],
}

export const AuthorPage = ({ authors }: AuthorPageProps) => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">Authors</h2>
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to="create">新規登録</Link>
      </div>
      <Table<Author>
        headerInfo={[
          {
            name: "Id",
            onClick: () => {},
          },
          {
            name: "Name",
            onClick: () => {},
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.name
          },
        ]}
        content={authors}
      ></Table>
      <Link
        className="text-blue-600 dark:text-blue-500 hover:underline"
        to="/"
      >トップに戻る</Link>
      <>
        {
          import.meta.env.DEV ?
            <pre>
              {JSON.stringify(authors, null, 2)}
            </pre>
            :
            <></>
        }
      </>
    </main>
  )
}
