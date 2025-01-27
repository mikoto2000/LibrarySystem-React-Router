import { Form } from "react-router"
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput"
import { LabelAndSelect } from "~/components/labelandselect/LabelAndSelect"
import { Link } from "~/components/link/Link"
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { BookStockStatus } from "~/types"
import type { BookMasterWithoutAuthors } from "~/views/types"

type BookStockCreatePageProps = {
  bookMasters: BookMasterWithoutAuthors[],
  bookStockStatuses: BookStockStatus[],
}

export const BookStockCreatePage = ({ bookMasters, bookStockStatuses }: BookStockCreatePageProps) => {
  return (
    <main>
      <Form method="post">
        <div>
          <LabelAndSelect
            label="書籍情報"
            selectName="bookMasterId"
            multiple
            required
          >
            {
              bookMasters.map((e) => <option value={e.id}>{e.name}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <LabelAndSelect
            label="書籍状態"
            selectName="bookStockStatusId"
            required
          >
            {
              bookStockStatuses.map((e) => <option value={e.id}>{e.name}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <LabelAndInput
            label="メモ"
            inputType="text"
            inputName="memo"
          />
        </div>
        <div className="pt-2">
          <SubmitButton
            label="登録"
          />
        </div>
      </Form>
      <Link label="一覧に戻る" to="../bookStocks"></Link>
    </main>
  )
}

