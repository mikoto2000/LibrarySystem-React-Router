import { Link, useNavigate } from "react-router";
import { Button } from "~/components/button/Button";
import { Table } from "~/components/table/Table";
import type { Author } from "~/types";

type AuthorPageProps = {
  authors: Author[],
}

export const AuthorPage = ({ authors }: AuthorPageProps) => {
  return (
    <main>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">Authors</h2>
        <Button
          label="新規作成"
          to="create"
        />
      </div>
      <Table<Author>
        linkTo="authors"
        headerInfo={[
          {
            name: "Id",
            onClick: () => { },
          },
          {
            name: "Name",
            onClick: () => { },
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
