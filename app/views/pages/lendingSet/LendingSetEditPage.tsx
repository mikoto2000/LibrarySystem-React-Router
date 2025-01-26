import { Form } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { Link } from "~/components/link/Link";
import { SubmitButton } from "~/components/submitbutton/SubmitButton";
import type { Customer, LendingStatus } from "~/types";
import type { BookStockWithoutAuthor, LendingSet } from "~/views/types";

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
          <LabelAndInput
            label="Id"
            inputType="text"
            inputName="id"
            inputDefaultValue={lendingSet.id}
            readOnly
          />
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
          <LabelAndInput
            label="貸出開始日"
            inputType="text"
            inputName="lendStartDate"
            inputDefaultValue={lendingSet.lendStartDate}
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="貸出期限"
            inputType="text"
            inputName="lendDeadlineDate"
            inputDefaultValue={lendingSet.lendDeadlineDate}
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="返却日"
            inputType="text"
            inputName="returnDate"
            inputDefaultValue={lendingSet.returnDate}
          />
        </div>
        <div>
          <LabelAndInput
            label="メモ"
            inputType="text"
            inputName="memo"
            inputDefaultValue={lendingSet.memo}
          />
        </div>
        <div className="pt-2" >
          <SubmitButton
            label="変更"
          />
        </div>
      </Form >
      {" "}
      <Link label="詳細へ戻る" to={`/lendingSets/${lendingSet.id}`}></Link>
      {" "}
      <Link label="一覧へ戻る" to="/lendingSets"></Link>
      {" "}
      <Link label="トップへ戻る" to="/"></Link>
    </main >
  )
}


