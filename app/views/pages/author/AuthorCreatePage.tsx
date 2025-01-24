import { Form, Link } from "react-router"
import { SubmitButton } from "~/components/submitbutton/SubmitButton"

export const AuthorCreatePage = () => {
  return (
    <main>
      <Form method="post">
        <input type="text" name="name" placeholder="name" />
        <SubmitButton
          label="登録"
        />
      </Form>
      <Link to="../authors">一覧に戻る</Link>
    </main>
  )
}

