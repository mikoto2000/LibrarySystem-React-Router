import { useNavigate } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import { Table } from "~/components/table/Table";
import type { BookStockStatus } from "~/types";

type SearchParam = {
  name: string,
  sortOrder: string,
  orderBy: string,
  page: number,
  limit: number
};

type BookStockStatusPageProps = {
  bookStockStatuses: BookStockStatus[],
  searchParam: SearchParam,
}

export const BookStockStatusPage = ({ bookStockStatuses, searchParam }: BookStockStatusPageProps) => {

  const navigate = useNavigate();

  /**
   * 既存の検索条件を引き継いで、更新された検索条件で検索結果を表示するためのURLを生成する。
   */
  const calcSearchNavigateUrl = (
    searchParam: SearchParam,
    orderBy?: string,
    sortOrder?: string
  ): string => {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParam)) {
      if (value) {
        searchParams.set(key, String(value));
      }
    }

    // sortOrderとorderByが指定されている場合は、それを上書きする
    if (sortOrder) {
      searchParams.set("sortOrder", sortOrder);
    }
    if (orderBy) {
      searchParams.set("orderBy", orderBy);
    }

    return `/bookStockStatuses?${searchParams.toString()}`;
  }

  return (
    <main>
      {/* 検索フォーム*/}
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">検索フォーム</h2>
        <form method="get" action="/bookStockStatuses">
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
        <h2 className="font-bold text-2xl mt-2 mb-1 ">BookStockStatuses</h2>
        <LinkButton
          label="新規作成"
          to="create"
        />
      </div>
      <Table<BookStockStatus>
        linkTo="bookStockStatuses"
        headerInfo={[
          {
            name: "Id",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "id", newSortOrder));
            },
          },
          {
            name: "Name",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "name", newSortOrder));
            },
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
        content={bookStockStatuses}
      ></Table>
      <Link
        label="トップに戻る"
        to="/"
      ></Link>
      {
        import.meta.env.DEV
          ?
          <pre>
            {
              JSON.stringify(bookStockStatuses, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
