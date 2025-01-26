import { Form } from "react-router";
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput";
import { LabelAndSelect } from "~/components/labelandselect/LabelAndSelect";
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
          <LabelAndSelect
            label="貸出先"
            selectName="customerId"
            required
          >
            {
              customers.map((e) => <option value={e.id}>{e.name}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <LabelAndSelect
            label="貸出書籍"
            selectName="bookStockIds"
            multiple
            required
          >
            {
              bookStocks.map((e) => <option selected={selectedBookStockIds.includes(e.id)} value={e.id}>{e.bookMaster.name}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <LabelAndSelect
            label="貸出状態"
            selectName="lendingStatusId"
            required
          >
            {
              lendingStatuses.map((e) => <option selected={lendingSet.lendingStatus.id === e.id} value={e.id}>{e.name}</option>)
            }
          </LabelAndSelect>
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


