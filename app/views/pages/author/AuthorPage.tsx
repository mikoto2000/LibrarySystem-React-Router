import { Link, useNavigate } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import { Table } from "~/components/table/Table";
import type { Author } from "~/types";

type AuthorPageProps = {
  authors: Author[],
  searchedName: string | null,
}

export const AuthorPage = ({ authors, searchedName }: AuthorPageProps) => {
  return (
    <main>
      {/* 検索フォーム*/}
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">検索フォーム</h2>
        <form method="get" action="/authors">
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={searchedName ? searchedName : ""}
          />
          <SubmitButton
            label="検索"
          />
        </form>
      </div>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">Authors</h2>
        <LinkButton
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
