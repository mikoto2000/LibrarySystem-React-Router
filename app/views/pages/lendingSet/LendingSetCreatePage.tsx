import { Form, Link } from "react-router"
import { LabelAndInput } from "~/components/labelandinput/LabelAndInput"
import { LabelAndSelect } from "~/components/labelandselect/LabelAndSelect"
import { SubmitButton } from "~/components/submitbutton/SubmitButton"
import type { Customer, LendingStatus } from "~/types"
import type { BookStockWithoutAuthor } from "~/views/types"

type LendingSetCreatePageProps = {
  customers: Customer[],
  bookStocks: BookStockWithoutAuthor[],
  lendingStatuses: LendingStatus[],
}

export const LendingSetCreatePage = ({ customers, bookStocks, lendingStatuses }: LendingSetCreatePageProps) => {
  return (
    <main>
      <Form method="post">
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
              bookStocks.map((e) => <option value={e.id}>{e.id}: {e.bookMaster.name}, {e.memo}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <LabelAndSelect
            label="貸出ステータス"
            selectName="lendingStatusId"
            required
          >
            {
              lendingStatuses.map((e) => <option value={e.id}>{e.name}</option>)
            }
          </LabelAndSelect>
        </div>
        <div>
          <LabelAndInput
            label="貸出開始日"
            inputType="date"
            inputName="lendStartDate"
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="貸出期限"
            inputType="date"
            inputName="lendDeadlineDate"
            required
          />
        </div>
        <div>
          <LabelAndInput
            label="メモ"
            inputType="text"
            inputName="memo"
            required
          />
        </div>
        <div className="pt-2">
          <SubmitButton
            label="登録"
          />
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

