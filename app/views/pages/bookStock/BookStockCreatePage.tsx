import { Form, Link } from "react-router"
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
          <label>書籍情報:
            <select name="bookMasterId">
              {
                bookMasters.map((e) => <option value={e.id}>{e.name}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>書籍状態:
            <select name="bookStockStatusId">
              {
                bookStockStatuses.map((e) => <option value={e.id}>{e.name}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>メモ:
            <input type="text" name="memo" placeholder="memo" />
          </label>
        </div>
        <div>
          <SubmitButton
            label="登録"
          />
        </div>
      </Form>
      <Link to="../bookStocks">一覧に戻る</Link>
    </main>
  )
}

