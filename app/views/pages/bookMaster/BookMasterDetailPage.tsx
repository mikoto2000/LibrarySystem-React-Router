import { Form } from "react-router";
import { DetailView } from "~/components/detailview/DetailView";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { BookMaster } from "~/types";

type BookMasterDetailPageProps = {
  bookMaster: BookMaster,
}

export const BookMasterDetailPage = ({ bookMaster }: BookMasterDetailPageProps) => {
  return (
    <main>
      <DetailView<BookMaster>
        content={bookMaster}
        valueInfos={[
          {
            name: "Id",
            getValueFunc: (e) => e.id.toString(),
          },
          {
            name: "Isbn",
            getValueFunc: (e) => e.isbn,
          },
          {
            name: "name",
            getValueFunc: (e) => e.name,
          },
          {
            name: "Publication Date",
            getValueFunc: (e) => e.publicationDate,
          },
          {
            name: "Authors",
            getValueFunc: (a) => a.authors.map((e) => `${e.id}: ${e.name}`).join(", "),
          },
        ]}
      />
      <div className="pl-1 pt-3 pb-1">
        <LinkButton label="編集する" to={`/bookMasters/${bookMaster.id}/edit`} />
        {" "}
        <Form className="inline" method="post" action={`/bookMasters/${bookMaster.id}/delete`}>
          <SubmitButton
            label="削除する"
          />
        </Form>
      </div>
      <div>
        <Link label="一覧へ戻る" to="/bookMasters"></Link>
        {" "}
        <Link label="トップへ戻る" to="/"></Link>
      </div>
      <pre>
        {
          import.meta.env.DEV
            ?
            JSON.stringify(bookMaster, null, 2)
            :
            <></>
        }
      </pre>
    </main>
  )
}

