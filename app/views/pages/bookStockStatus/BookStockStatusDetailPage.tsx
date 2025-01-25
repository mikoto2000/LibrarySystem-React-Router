import { Form } from "react-router";
import { DetailView } from "~/components/detailview/DetailView";
import { Link } from "~/components/link/Link";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { BookStockStatus } from "~/types";

type BookStockStatusDetailPageProps = {
  bookStockStatus: BookStockStatus,
}

export const BookStockStatusDetailPage = ({ bookStockStatus }: BookStockStatusDetailPageProps) => {
  return (
    <main>
      <DetailView<BookStockStatus>
        content={bookStockStatus}
        valueInfos={[
          {
            name: "Id",
            getValueFunc: (e) => e.id.toString()
          },
          {
            name: "name",
            getValueFunc: (e) => e.name
          }
        ]}
      />
      <div className="pl-1 pt-3 pb-1">
        <LinkButton
          label="編集する"
          to={`/bookStockStatuses/${bookStockStatus.id}/edit`}
        />
        {" "}
        <Form className="inline" method="post" action={`/bookStockStatuses/${bookStockStatus.id}/delete`}>
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
      <pre>
        {
          import.meta.env.DEV
            ?
            JSON.stringify(bookStockStatus, null, 2)
            :
            <></>
        }
      </pre>
    </main>
  )
}

