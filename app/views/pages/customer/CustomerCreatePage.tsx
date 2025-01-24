import { Form, Link } from "react-router"
import { SubmitButton } from "~/components/submitbutton/SubmitButton"

export const CustomerCreatePage = () => {
  return (
    <main>
      <Form method="post">
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="emailAddress" placeholder="emailAddress" />
        <SubmitButton
          label="登録"
        />
      </Form>
      <Link to="../customers">一覧に戻る</Link>
    </main>
  )
}

