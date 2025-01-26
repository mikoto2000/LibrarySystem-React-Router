import { Form } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { LabelAndSelect } from "~/components/labelandselect/LabelAndSelect";
import { Link } from "~/components/link/Link";
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { BookStockStatus } from "~/types";
import type { BookMasterWithoutAuthors, BookStockWithoutAuthor } from "~/views/types";

type BookStockEditPageProps = {
  bookStock: BookStockWithoutAuthor,
  bookMasters: BookMasterWithoutAuthors[],
  bookStockStatuses: BookStockStatus[],
}

export const BookStockEditPage = ({ bookStock, bookMasters, bookStockStatuses }: BookStockEditPageProps) => {
  return (
    <main>
      <Form method="post">
        <div>
          <LabelAndInput
            label="Id"
            inputType="text"
            inputName="id"
            inputDefaultValue={bookStock.id}
            readOnly
          />
        </div>
        <div>
          <LabelAndSelect
            label="書籍"
            selectName="bookMasterId"
            required
          >
            {
              bookMasters.map((e) => <option selected={bookStock.bookMaster.id === e.id} value={e.id}>{e.name}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <LabelAndSelect
            label="在庫情報"
            selectName="bookStockStatusId"
            required
          >
            {
              bookStockStatuses.map((e) => <option selected={bookStock.bookStockStatus.id === e.id} value={e.id}>{e.name}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <LabelAndInput
            label="Name"
            inputType="text"
            inputName="name"
            inputDefaultValue={bookStock.memo}
          />
        </div>
        <div>
          <SubmitButton
            label="変更"
          />
        </div>
      </Form>
      {" "}
      <Link label="詳細へ戻る" to={`/bookStocks/${bookStock.id}`}></Link>
      {" "}
      <Link label="一覧へ戻る" to="/bookStocks"></Link>
      {" "}
      <Link label="トップへ戻る" to="/"></Link>
      <pre>
        {
          import.meta.env.DEV
            ?
            JSON.stringify(bookStock, null, 2)
            :
            <></>
        }
      </pre>
    </main >
  )
}


