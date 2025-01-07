import { Form, Link } from "react-router";
import type { BookMaster, LendingSet, LendingSetStatus } from "~/types";

type LendingSetEditPageProps = {
  lendingSet: LendingSet,
  bookMasters: BookMaster[],
  lendingSetStatuses: LendingSetStatus[],
}

export const LendingSetEditPage = ({ lendingSet, bookMasters, lendingSetStatuses }: LendingSetEditPageProps) => {
  console.log(lendingSet);
  return (
    <main>
      <Form method="post">
        <div>
          <label>Id:<input type="text" name="id" value={lendingSet.id}/></label>
        </div>
        <div>
          <select name="bookMasterId">
            {
              bookMasters.map((e) => <option selected={lendingSet.bookMasterId === e.id} value={e.id}>{e.name}</option>)
            }
          </select>
        </div>
        <div>
          <select name="lendingSetStatusId">
            {
              lendingSetStatuses.map((e) => <option selected={lendingSet.lendingSetStatusId === e.id} value={e.id}>{e.name}</option>)
            }
          </select>
        </div>
        <div>
          <input type="text" name="memo" defaultValue={lendingSet.memo} placeholder="memo" />
        </div>
        <div>
          <button type="submit">変更</button>
        </div>
      </Form>
      {" "}
      <Link to="/lendingSets">一覧へ戻る</Link>
      {" "}
      <Link to="/">トップへ戻る</Link>
    </main>
  )
}


