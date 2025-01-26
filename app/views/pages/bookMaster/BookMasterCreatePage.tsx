import { Form } from "react-router"
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput"
import { LabelAndSelect } from "~/components/labelandselect/LabelAndSelect"
import { Link } from "~/components/link/Link"
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { Author } from "~/types"

type BookMasterCreatePageProps = {
  authors: Author[],
}

export const BookMasterCreatePage = ({ authors }: BookMasterCreatePageProps) => {
  return (
    <main>
      <Form method="post">
        <div>
          <LabelAndInput
            label="Isbn"
            inputType="text"
            inputName="isbn"
            inputDefaultValue=""
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue=""
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="Publication Date"
            inputType="date"
            inputName="publicationDate"
            inputDefaultValue=""
            required
          />
        </div>
        <div>
          <LabelAndSelect
            label="Authors"
            selectName="authors"
            multiple
            required
          >
            {
              authors.map((e) => <option value={e.id}>{e.name}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <SubmitButton
            label="登録"
          />
        </div>
      </Form>
      <Link label="一覧に戻る" to="../bookMasters"></Link>
    </main>
  )
}

