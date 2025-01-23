import { Form, Link } from "react-router";
import { Button } from "~/components/button/Button";
import type { Author } from "~/types";

type AuthorDetailPageProps = {
  author: Author,
}

export const AuthorDetailPage = ({ author }: AuthorDetailPageProps) => {
  return (
    <main>
      <h2 className="font-bold text-2xl mt-2 mb-1 ">Author</h2>
      <table
        className="w-80 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <tbody>
          <tr
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-blue-600 dark:text-blue-500 hover:underline"
          >
            <th>Id</th><td>{author.id}</td>
          </tr>
          <tr
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-blue-600 dark:text-blue-500 hover:underline"
          >
            <th>Name</th><td>{author.name}</td>
          </tr>
        </tbody>
      </table>
      <div className="pl-1 pt-3 pb-3">
        <Button
          label="編集する"
          to={`/authors/${author.id}/edit`}
        />
        <Button
          label="削除する"
          to={`/authors/${author.id}/delete`}
        />
      </div>
      <div>
        <Link
          className="text-blue-600 dark:text-blue-500 hover:underline"
          to="/authors">一覧へ戻る</Link>
        {" "}
        <Link
          className="text-blue-600 dark:text-blue-500 hover:underline"
          to="/">トップへ戻る</Link>
      </div>
    </main>
  )
}

