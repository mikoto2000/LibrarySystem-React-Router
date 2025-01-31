import { useNavigate } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import { Table } from "~/components/table/Table";
import type { Customer } from "~/types";

type SearchParam = {
  name: string,
  emailAddress: string,
  sortOrder: string,
  orderBy: string,
  page: number,
  limit: number
};

type CustomerPageProps = {
  customeres: Customer[],
  searchParam: SearchParam,
}

export const CustomerPage = ({ customeres, searchParam }: CustomerPageProps) => {

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

    return `/customers?${searchParams.toString()}`;
  }

  return (
    <main>
      {/* 検索フォーム*/}
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">検索フォーム</h2>
        <form method="get" action="/customers">
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={searchParam.name ? searchParam.name : ""}
          />
          <LabelAndInput
            label="Email Address"
            inputType="text"
            inputName="emailAddress"
            inputDefaultValue={searchParam.emailAddress ? searchParam.emailAddress : ""}
          />
          <SubmitButton
            label="検索"
          />
        </form>
      </div>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">Customeres</h2>
        <LinkButton
          label="新規作成"
          to="create"
        />
      </div>
      <Table<Customer>
        linkTo="customers"
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
            name: "Name",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "name", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "name" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "name" ? "▼" : "",
          },
          {
            name: "Email Address",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam, "emailAddress", newSortOrder));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "emailAddress" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "emailAddress" ? "▼" : "",
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.name
          },
          {
            getValueFunc: (e) => e.emailAddress
          },
        ]}
        content={customeres}
      ></Table>
      <Link
        label="トップに戻る"
        to="/"></Link>
      {
        import.meta.env.DEV
          ?
          <pre>
            {
              JSON.stringify(customeres, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
