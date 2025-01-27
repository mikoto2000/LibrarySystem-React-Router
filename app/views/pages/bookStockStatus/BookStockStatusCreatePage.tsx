import { Form } from "react-router"
import { Link } from "~/components/link/Link"
import { SubmitButton } from "~/components/submitbutton/SubmitButton"

export const BookStockStatusCreatePage = () => {
  return (
    <main>
      <Form method="post">
        <label>Name: <input type="text" name="name" /></label>
        <SubmitButton
          label="登録"
        />
      </Form>
      <Link
        label="一覧に戻る"
        to="../bookStockStatuses"></Link>
    </main>
  )
}

