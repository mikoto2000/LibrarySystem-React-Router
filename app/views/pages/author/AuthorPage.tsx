import { Link, useNavigate } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import { Table } from "~/components/table/Table";
import type { Author } from "~/types";

type AuthorPageProps = {
  authors: Author[],
  searchParam: {
    name: string,
    orderBy: string,
    sortOrder: string,
  },
}

export const AuthorPage = ({ authors, searchParam }: AuthorPageProps) => {

  const navigate = useNavigate();

  /**
   * 既存の検索条件を引き継いで、更新された検索条件で検索結果を表示するためのURLを生成する。
   */
  const calcSearchNavigateUrl = (name?: string, orderBy?: string, sortOrder?: string): string => {
    const searchParams = new URLSearchParams();
    if (name) {
      searchParams.set("name", name);
    }
    if (orderBy) {
      searchParams.set("orderBy", orderBy);
    }
    if (sortOrder) {
      searchParams.set("sortOrder", sortOrder);
    }
    return `/authors?${searchParams.toString()}`;
  }

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
            inputDefaultValue={searchParam.name ? searchParam.name : ""}
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
            onClick: () => {
              const newSortOrder = searchParam.orderBy === "id" && searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam.name, "id", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "id" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "id" ? "▼" : "",
          },
          {
            name: "Name",
            onClick: () => {
              const newSortOrder = searchParam.orderBy === "name" && searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam.name, "name", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "name" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "name" ? "▼" : "",
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
