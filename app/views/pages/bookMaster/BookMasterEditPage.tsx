import { Form } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { Author, BookMaster } from "~/types";

type BookMasterEditPageProps = {
  bookMaster: BookMaster,
  authors: Author[],
}

export const BookMasterEditPage = ({ bookMaster, authors }: BookMasterEditPageProps) => {
  const authorIds = bookMaster.authors.map((e) => e.id)
  return (
    <main>
      <Form method="post" name="edit">
        <div>
          <LabelAndInput
            label="Id"
            inputType="text"
            inputName="id"
            inputDefaultValue={bookMaster.id}
            readOnly
          />
        </div>
        <div>
          <LabelAndInput
            label="Isbn"
            inputType="text"
            inputName="name"
            inputDefaultValue={bookMaster.isbn}
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={bookMaster.name}
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="Publication Date"
            inputType="date"
            inputName="name"
            inputDefaultValue={bookMaster.publicationDate}
            required
          />
        </div>
        <div>
          <label>Authors:</label>
          <div>
            <select multiple required name="authorIds">
              {
                authors.map((e) => <option selected={authorIds.includes(e.id)} value={e.id}>{e.name}</option>)
              }
            </select>
          </div>
        </div>
        <SubmitButton
          label="変更"
        />
      </Form>
      {" "}
      <Link label="詳細へ戻る" to={`/bookMasters/${bookMaster.id}`}></Link>
      {" "}
      <Link label="一覧へ戻る" to="/bookMasters"></Link>
      {" "}
      <Link label="トップへ戻る" to="/"></Link>
    </main>
  )
}


