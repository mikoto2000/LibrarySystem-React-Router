import { Form } from "react-router";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import { Link } from "~/components/link/Link";
import type { Author } from "~/types";
import { DetailView } from "~/components/detailview/DetailView";

type AuthorDetailPageProps = {
  author: Author,
}

export const AuthorDetailPage = ({ author }: AuthorDetailPageProps) => {
  return (
    <main>
      <h2 className="font-bold text-2xl mt-2 mb-1 ">Author</h2>
      <DetailView<Author>
        content={author}
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
          to={`/authors/${author.id}/edit`}
        />
        {" "}
        <Form className="inline" method="post" action={`/authors/${author.id}/delete`}>
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
    </main>
  )
}

