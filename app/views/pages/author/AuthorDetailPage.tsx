import { Form } from "react-router";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
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
        <LinkButton
          label="編集する"
          to={`/authors/${author.id}/edit`}
        />
        {" "}
        <Form className="inline" method="post" action={`/authors/${author.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
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

