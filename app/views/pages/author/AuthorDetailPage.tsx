import { Form } from "react-router";
import { Button } from "~/components/button/Button";
import { Link } from "~/components/link/Link";
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
      <div className="pl-1 pt-3 pb-1">
        <Button
          label="編集する"
          to={`/authors/${author.id}/edit`}
        />
        {" "}
        <Form className="inline" method="post" action={`/authors/${author.id}/delete`}>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit">削除する</button>
        </Form>
      </div>
      <div>
        <Link
          label="一覧へ戻る"
          to="/authors" />
        {" "}
        <Link
          label="トップへ戻る"
          to="/" />
      </div>
    </main>
  )
}

