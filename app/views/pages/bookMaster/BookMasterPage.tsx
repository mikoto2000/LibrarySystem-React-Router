import { useNavigate } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import { Table } from "~/components/table/Table";
import type { BookMasterList, BookMasterWithoutAuthors } from "~/views/types";

type BookMasterPageProps = {
  bookMasters: BookMasterList,
  searchParam: {
    isbn: string,
    name: string,
    publicationDateBegin: string,
    publicationDateEnd: string,
    sortOrder: string,
    orderBy: string,
  },
}

export const BookMasterPage = ({ bookMasters, searchParam }: BookMasterPageProps) => {

  const navigate = useNavigate();

  /**
   * 既存の検索条件を引き継いで、更新された検索条件で検索結果を表示するためのURLを生成する。
   */
  const calcSearchNavigateUrl = (
    isbn?: string,
    name?: string,
    publicationDateBegin?: string,
    publicationDateEnd?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): string => {
    const searchParams = new URLSearchParams();
    if (isbn) {
      searchParams.set("isbn", isbn);
    }
    if (name) {
      searchParams.set("name", name);
    }
    if (publicationDateBegin) {
      searchParams.set("publicationDateBegin", publicationDateBegin);
    }
    if (publicationDateEnd) {
      searchParams.set("publicationDateEnd", publicationDateEnd);
    }
    if (sortOrder) {
      searchParams.set("sortOrder", sortOrder);
    }
    if (orderBy) {
      searchParams.set("orderBy", orderBy);
    }
    if (page) {
      searchParams.set("page", page.toString());
    }
    if (limit) {
      searchParams.set("limit", limit.toString());
    }
    return `/bookMasters?${searchParams.toString()}`;
  }

  return (
    <main>
      {/* 検索フォーム*/}
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">検索フォーム</h2>
        <form method="get" action="/bookMasters">
          <LabelAndInput
            label="ISBN"
            inputType="text"
            inputName="isbn"
            inputDefaultValue={searchParam.isbn ? searchParam.isbn : ""}
          />
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={searchParam.name ? searchParam.name : ""}
          />
          <LabelAndInput
            label="Publication Date Begin"
            inputType="date"
            inputName="publicationDateBegin"
            inputDefaultValue={searchParam.publicationDateBegin ? searchParam.publicationDateBegin : ""}
          />
          <LabelAndInput
            label="Publication Date End"
            inputType="date"
            inputName="publicationDateEnd"
            inputDefaultValue={searchParam.publicationDateEnd ? searchParam.publicationDateEnd : ""}
          />
          <SubmitButton
            label="検索"
          />
        </form>
      </div>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">BookMasters</h2>
        <LinkButton
          label="新規作成"
          to="create"
        />
      </div>
      <Table<BookMasterWithoutAuthors>
        linkTo="bookMasters"
        headerInfo={[
          {
            name: "Id",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam.isbn, searchParam.name, searchParam.publicationDateBegin, searchParam.publicationDateEnd, newSortOrder, "id"));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "id" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "id" ? "▼" : "",
          },
          {
            name: "ISBN",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam.isbn, searchParam.name, searchParam.publicationDateBegin, searchParam.publicationDateEnd, newSortOrder, "isbn"));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "isbn" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "isbn" ? "▼" : "",
          },
          {
            name: "Book Name",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam.isbn, searchParam.name, searchParam.publicationDateBegin, searchParam.publicationDateEnd, newSortOrder, "name"));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "name" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "name" ? "▼" : "",
          },
          {
            name: "Publication Date",
            onClick: () => {
              const newSortOrder = searchParam.sortOrder === "asc" ? "desc" : "asc";
              navigate(calcSearchNavigateUrl(searchParam.isbn, searchParam.name, searchParam.publicationDateBegin, searchParam.publicationDateEnd, newSortOrder, "publicationDate"));
            },
            footer: searchParam.sortOrder === "asc" && searchParam.orderBy === "publicationDate" ? "▲" : searchParam.sortOrder === "desc" && searchParam.orderBy === "publicationDate" ? "▼" : "",
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.isbn
          },
          {
            getValueFunc: (e) => e.name
          },
          {
            getValueFunc: (e) => e.publicationDate
          },
        ]}
        content={bookMasters}
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
              JSON.stringify(bookMasters, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
