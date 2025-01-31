import { useNavigate } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import { Table } from "~/components/table/Table";
import type { LendingSetList, LendingSetWithoutAuthor } from "~/views/types";

type SearchParam = {
  lendingStatusId: number,
  customer: string,
  lendStartDateBegin: string,
  lendStartDateEnd: string,
  lendDeadlineDateBegin: string,
  lendDeadlineDateEnd: string,
  returnDateBegin: string,
  returnDateEnd: string,
  memo: string,
  sortOrder: string,
  orderBy: string,
  page: number,
  limit: number
};

type LendingSetPageProps = {
  lendingSets: LendingSetList,
  searchParam: SearchParam,
}

export const LendingSetPage = ({ lendingSets, searchParam }: LendingSetPageProps) => {

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

    return `/lendingSets?${searchParams.toString()}`;
  }

  return (
    <main>
      {/* 検索フォーム*/}
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">検索フォーム</h2>
        <form method="get" action="/lendingSets">
          <LabelAndInput
            label="Lending Status Id"
            inputType="text"
            inputName="lendingStatusId"
            inputDefaultValue={searchParam.lendingStatusId ? searchParam.lendingStatusId.toString() : ""}
          />
          <LabelAndInput
            label="Customer"
            inputType="text"
            inputName="customer"
            inputDefaultValue={searchParam.customer ? searchParam.customer : ""}
          />
          <LabelAndInput
            label="Lend Start Date Begin"
            inputType="date"
            inputName="lendStartDateBegin"
            inputDefaultValue={searchParam.lendStartDateBegin ? searchParam.lendStartDateBegin : ""}
          />
          <LabelAndInput
            label="Lend Start Date End"
            inputType="date"
            inputName="lendStartDateEnd"
            inputDefaultValue={searchParam.lendStartDateEnd ? searchParam.lendStartDateEnd : ""}
          />
          <LabelAndInput
            label="Lend Deadline Date Begin"
            inputType="date"
            inputName="lendDeadlineDateBegin"
            inputDefaultValue={searchParam.lendDeadlineDateBegin ? searchParam.lendDeadlineDateBegin : ""}
          />
          <LabelAndInput
            label="Lend Deadline Date End"
            inputType="date"
            inputName="lendDeadlineDateEnd"
            inputDefaultValue={searchParam.lendDeadlineDateEnd ? searchParam.lendDeadlineDateEnd : ""}
          />
          <LabelAndInput
            label="Return Date Begin"
            inputType="date"
            inputName="returnDateBegin"
            inputDefaultValue={searchParam.returnDateBegin ? searchParam.returnDateBegin : ""}
          />
          <LabelAndInput
            label="Return Date End"
            inputType="date"
            inputName="returnDateEnd"
            inputDefaultValue={searchParam.returnDateEnd ? searchParam.returnDateEnd : ""}
          />
          <LabelAndInput
            label="Memo"
            inputType="text"
            inputName="memo"
            inputDefaultValue={searchParam.memo ? searchParam.memo : ""}
          />
          <SubmitButton
            label="検索"
          />
        </form>
      </div>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">LendingSets</h2>
        <LinkButton
          label="新規作成"
          to="create"
        />
      </div>
      <Table<LendingSetWithoutAuthor>
        linkTo="lendingSets"
        headerInfo={[
          {
            name: "Id",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "id", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "id" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "id" ? "▼" : "",
          },
          {
            name: "Status",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "status", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "status" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "status" ? "▼" : "",
          },
          {
            name: "Customer",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "customer", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "customer" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "customer" ? "▼" : "",
          },
          {
            name: "Lend Start Date",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "lendStartDate", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "lendStartDate" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "lendStartDate" ? "▼" : "",
          },
          {
            name: "Lend Deadline Date",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "lendDeadlineDate", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "lendDeadlineDate" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "lendDeadlineDate" ? "▼" : "",
          },
          {
            name: "Return Date",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "returnDate", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "returnDate" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "returnDate" ? "▼" : "",
          },
          {
            name: "Books",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "books", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "books" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "books" ? "▼" : "",
          },
          {
            name: "Memo",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "memo", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "memo" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "memo" ? "▼" : "",
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.lendingStatus.name
          },
          {
            getValueFunc: (e) => e.customer
          },
          {
            getValueFunc: (e) => e.lendStartDate
          },
          {
            getValueFunc: (e) => e.lendDeadlineDate
          },
          {
            getValueFunc: (e) => e.returnDate
          },
          {
            getValueFunc: (e) => e.bookStocks.join(", ")
          },
          {
            getValueFunc: (e) => e.memo ? e.memo : ""
          },
        ]}
        content={lendingSets}
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
              JSON.stringify(lendingSets, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
