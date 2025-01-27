import { Form } from "react-router"
import { Link } from "~/components/link/Link"
import { SubmitButton } from "~/components/submitbutton/SubmitButton"

export const LendingStatusCreatePage = () => {
  return (
    <main>
      <Form method="post">
        <input type="text" name="name" placeholder="name" />
        <SubmitButton
          label="登録"
        />
      </Form>
      <Link
        label="一覧に戻る"
        to="../lendingStatuses"></Link>
    </main>
  )
}

