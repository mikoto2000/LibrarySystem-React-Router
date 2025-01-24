import { Form, Link } from "react-router"
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
      <Link to="../bookStockStatuses">一覧に戻る</Link>
    </main>
  )
}

