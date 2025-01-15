import { Form, Link } from "react-router"
import type { BookMaster, BookStockStatus, Customer, LendingStatus } from "~/types"

type LendingSetCreatePageProps = {
  customers: Customer[],
  bookStocks: {
    id: number,
    bookStockStatus: BookStockStatus,
    bookName: string,
    memo: string | null,
  }[],
  lendingStatuses: LendingStatus[],
}

export const LendingSetCreatePage = ({ customers, bookStocks, lendingStatuses }: LendingSetCreatePageProps) => {
  return (
    <main>
      <Form method="post">
        <div>
          <label>貸出先:
            <select name="customerId">
              {
                customers.map((e) => <option value={e.id}>{e.name}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>貸出書籍:
            <select multiple name="bookStockIds">
              {
                bookStocks.map((e) => <option value={e.id}>{e.id}: {e.bookName}, {e.memo}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>貸出ステータス:
            <select name="lendingStatusId">
              {
                lendingStatuses.map((e) => <option value={e.id}>{e.name}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>貸出開始日:
            <input type="date" name="lendStartDate" />
          </label>
        </div>
        <div>
          <label>貸出期限:
            <input type="date" name="lendDeadlineDate" />
          </label>
        </div>
        <div>
          <label>memo:
            <input type="text" name="memo" placeholder="memo" />
          </label>
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </Form>
      <pre>
        {
          JSON.stringify(bookStocks, null, 2)
        }
      </pre>
      <Link to="../bookStocks">一覧に戻る</Link>
    </main >
  )
}

