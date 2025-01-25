import { Form } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { Author } from "~/types";

type AuthorEditPageProps = {
  author: Author,
}

export const AuthorEditPage = ({ author }: AuthorEditPageProps) => {
  return (
    <main>
      <Form method="post" name="edit">
        <div>
          <LabelAndInput
            label="Id"
            inputType="text"
            inputName="id"
            inputDefaultValue={author.id}
            readOnly
          />
        </div>
        <div>
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={author.name}
            required
          />
        </div>
        <div className="pt-2" >
          <SubmitButton
            label="変更"
          />
        </div>
      </Form>
      {" "}
      <Link label="詳細へ戻る" to={`/authors/${author.id}`}></Link>
      {" "}
      <Link label="一覧へ戻る" to="/authors"></Link>
      {" "}
      <Link label="トップへ戻る" to="/"></Link>
    </main>
  )
}


