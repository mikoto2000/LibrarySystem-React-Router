import { Form, Link } from "react-router";
import type { BookStockStatus } from "~/types";
import type { BookMasterWithoutAuthors, BookStockWithoutAuthor } from "~/views/types";

type BookStockEditPageProps = {
  bookStock: BookStockWithoutAuthor,
  bookMasters: BookMasterWithoutAuthors[],
  bookStockStatuses: BookStockStatus[],
}

export const BookStockEditPage = ({ bookStock, bookMasters, bookStockStatuses }: BookStockEditPageProps) => {
  console.log(bookStock);
  return (
    <main>
      <Form method="post">
        <div>
          <label>Id:<input type="text" name="id" value={bookStock.id} /></label>
        </div>
        <div>
          <label>書籍:
            <select name="bookMasterId">
              {
                bookMasters.map((e) => <option selected={bookStock.bookMaster.id === e.id} value={e.id}>{e.name}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>在庫情報
            <select name="bookStockStatusId">
              {
                bookStockStatuses.map((e) => <option selected={bookStock.bookStockStatus.id === e.id} value={e.id}>{e.name}</option>)
              }
            </select>
          </label>
        </div>
        <div>
          <label>メモ:
            <input type="text" name="memo" defaultValue={bookStock.memo ? bookStock.memo : ""} placeholder="memo" />
          </label>
        </div>
        <div>
          <button type="submit">変更</button>
        </div>
      </Form>
      {" "}
      <Link to={`/bookStocks/${bookStock.id}`}>詳細へ戻る</Link>
      {" "}
      <Link to="/bookStocks">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
      <pre>
        {
          JSON.stringify(bookStock, null, 2)
        }
      </pre>
    </main >
  )
}


