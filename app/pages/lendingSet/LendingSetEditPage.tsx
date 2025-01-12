import { Form, Link } from "react-router";
import type { LendingStatus } from "~/types";
import type { BookMasterList, LendingSet } from "~/views/types";

type LendingSetEditPageProps = {
  lendingSet: LendingSet,
  bookStocks: {
    id: number,
    bookName: string
  }[],
  lendingStatuses: LendingStatus[],
}

export const LendingSetEditPage = ({ lendingSet, bookStocks, lendingStatuses }: LendingSetEditPageProps) => {
  console.log(lendingSet);
  const selectedBookStockIds = lendingSet.bookStocks.map((e) => e.id);
  return (
    <main>
      <Form method="post">
        <div>
          <label>Id:<input type="text" name="id" value={lendingSet.id} /></label>
        </div>
        <div>
          <label>貸出書籍:
            <select name="bookStockIds" multiple>
              {
                bookStocks.map((e) => <option selected={selectedBookStockIds.includes(e.id)} value={e.id}>{e.bookName}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>貸出状態:
            <select name="lendingSetStatusId">
              {
                lendingStatuses.map((e) => <option selected={lendingSet.lendingStatus.id === e.id} value={e.id}>{e.name}</option>)
              }
            </select>
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


