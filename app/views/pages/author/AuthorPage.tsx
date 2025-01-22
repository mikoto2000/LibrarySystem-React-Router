import { Link, useNavigate } from "react-router";
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
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <td>Id</td>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {
            authors
              ?
              authors.map((e) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => navigate(`/authors/${e.id}`)}
                >
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                </tr>)
              )
              :
              <>表示要素がありませんでした</>
          }
        </tbody>
      </table>
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
