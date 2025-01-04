import { Form, Link } from "react-router"
import type { BookMaster, BookStockStatus } from "~/types"

type BookStockCreatePageProps = {
  bookMasters: BookMaster[],
  bookStockStatuses: BookStockStatus[],
}

export const BookStockCreatePage = ({ bookMasters, bookStockStatuses }: BookStockCreatePageProps) => {
  return (
    <main>
      <Form method="post">
        <div>
          <select name="bookMasterId">
            {
              bookMasters.map((e) => <option value={e.id}>{e.name}</option>)
            }
          </select>
        </div>
        <div>
          <select name="bookStockStatusId">
            {
              bookStockStatuses.map((e) => <option value={e.id}>{e.name}</option>)
            }
          </select>
        </div>
        <div>
          <input type="text" name="memo" placeholder="memo" />
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </Form>
      <Link to="../bookStocks">一覧に戻る</Link>
    </main>
  )
}

