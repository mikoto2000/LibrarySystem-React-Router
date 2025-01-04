import { Form, Link } from "react-router";
import type { BookMaster, BookStock, BookStockStatus } from "~/types";

type BookStockEditPageProps = {
  bookStock: BookStock,
  bookMasters: BookMaster[],
  bookStockStatuses: BookStockStatus[],
}

export const BookStockEditPage = ({ bookStock, bookMasters, bookStockStatuses }: BookStockEditPageProps) => {
  console.log(bookStock);
  return (
    <main>
      <Form method="post">
        <div>
          <label>Id:<input type="text" name="id" value={bookStock.id}/></label>
        </div>
        <div>
          <select name="bookMasterId">
            {
              bookMasters.map((e) => <option selected={bookStock.bookMasterId === e.id} value={e.id}>{e.name}</option>)
            }
          </select>
        </div>
        <div>
          <select name="bookStockStatusId">
            {
              bookStockStatuses.map((e) => <option selected={bookStock.bookStockStatusId === e.id} value={e.id}>{e.name}</option>)
            }
          </select>
        </div>
        <div>
          <input type="text" name="memo" defaultValue={bookStock.memo} placeholder="memo" />
        </div>
        <div>
          <button type="submit">変更</button>
        </div>
      </Form>
      {" "}
      <Link to="/bookStocks">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


