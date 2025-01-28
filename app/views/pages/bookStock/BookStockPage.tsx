import { useNavigate } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { LabelAndSelect } from "~/components/labelandselect/LabelAndSelect";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import { Table } from "~/components/table/Table";
import type { BookStockWithoutAuthor } from "~/views/types";

type SearchParam = {
  name: string,
  bookStockStatusId: number,
  memo: string,
  sortOrder: string,
  orderBy: string,
  page: number,
  limit: number
};


type BookStockPageProps = {
  bookStocks: BookStockWithoutAuthor[],
  searchParam: SearchParam,
  bookStockStatuses: { id: number, name: string }[],
}

export const BookStockPage = ({ bookStocks, searchParam, bookStockStatuses }: BookStockPageProps) => {

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

    return `/bookStocks?${searchParams.toString()}`;
  }

  return (
    <main>
      {/* 検索フォーム*/}
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">検索フォーム</h2>
        <form method="get" action="/bookStocks">
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={searchParam.name}
          />
          <LabelAndSelect
            label="BookStockStatusId"
            selectName="bookStockStatusId"
          >
            {
              bookStockStatuses.map((e) => {
                return (
                  <option key={e.id} value={e.id} selected={
                    searchParam.bookStockStatusId === e.id
                  } >{e.name}</option>
                )
              })
            }
          </LabelAndSelect>
          <LabelAndInput
            label="Memo"
            inputType="text"
            inputName="memo"
            inputDefaultValue={searchParam.memo}
          />
          <SubmitButton
            label="検索"
          />
        </form>
      </div>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">BookStocks</h2>
        <LinkButton
          label="新規作成"
          to="create"
        />
      </div>
      <Table<any>
        linkTo="bookStocks"
        headerInfo={[
          {
            name: "Id",
            onClick: () => {
              const newSortOrder = searchParam.orderBy === "id" && searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "id", newSortOrder));
            },
          },
          {
            name: "Name",
            onClick: () => {
              const newSortOrder = searchParam.orderBy === "name" && searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "name", newSortOrder));
            },
          },
          {
            name: "Status",
            onClick: () => {
              const newSortOrder = searchParam.orderBy === "status" && searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "status", newSortOrder));
            },
          },
          {
            name: "Memo",
            onClick: () => {
              const newSortOrder = searchParam.orderBy === "memo" && searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "memo", newSortOrder));
            },
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.bookMaster.name
          },
          {
            getValueFunc: (e) => e.bookStockStatus.name
          },
          {
            getValueFunc: (e) => e.memo
          },
        ]}
        content={bookStocks}
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
              JSON.stringify(bookStocks, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
