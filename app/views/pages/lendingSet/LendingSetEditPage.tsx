import { Form, Link } from "react-router";
import type { Customer, LendingStatus } from "~/types";
import type { BookMasterList, BookStockWithoutAuthor, LendingSet } from "~/views/types";

type LendingSetEditPageProps = {
  lendingSet: LendingSet,
  customers: Customer[],
  bookStocks: BookStockWithoutAuthor[],
  lendingStatuses: LendingStatus[],
}

export const LendingSetEditPage = ({ lendingSet, customers, bookStocks, lendingStatuses }: LendingSetEditPageProps) => {
  const selectedBookStockIds = lendingSet.bookStocks.map((e) => e.id);
  return (
    <main>
      <Form method="post">
        <div>
          <label>Id:<input type="text" name="id" value={lendingSet.id} /></label>
        </div>
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
            <select name="bookStockIds" multiple>
              {
                bookStocks.map((e) => <option selected={selectedBookStockIds.includes(e.id)} value={e.id}>{e.bookMaster.name}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>貸出状態:
            <select name="lendingStatusId">
              {
                lendingStatuses.map((e) => <option selected={lendingSet.lendingStatus.id === e.id} value={e.id}>{e.name}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>貸出開始日:
            <input type="date" name="lendStartDate" defaultValue={lendingSet.lendStartDate} />
          </label>
        </div>
        <div>
          <label>貸出期限:
            <input type="date" name="lendDeadlineDate" defaultValue={lendingSet.lendDeadlineDate} />
          </label>
        </div>
        <div>
          <label>返却日:
            <input type="date" name="returnDate" defaultValue={lendingSet.returnDate} />
          </label>
        </div>
        <div>
          <label>メモ:
            <input type="text" name="memo" defaultValue={lendingSet.memo} placeholder="memo" />
          </label>
        </div>
        <button type="submit">変更</button>
      </Form >
      {" "}
      <Link to={`/lendingSets/${lendingSet.id}`}>詳細へ戻る</Link>
      {" "}
      < Link to="/lendingSets" > 一覧へ戻る</Link >
      {" "}
      < Link to="/" > トップへ戻る</Link >
      <pre>
        {
          JSON.stringify(lendingSet, null, 2)
        }
      </pre>
    </main >
  )
}


