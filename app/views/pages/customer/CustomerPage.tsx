import { Link } from "react-router";
import { LinkButton } from "~/components/linkbutton/LinkButton";
import { Table } from "~/components/table/Table";
import type { Customer } from "~/types";

type CustomerPageProps = {
  customeres: Customer[],
}

export const CustomerPage = ({ customeres }: CustomerPageProps) => {
  return (
    <main>
      <div className="pb-3">
        <h2 className="font-bold text-2xl mt-2 mb-1 ">Customeres</h2>
        <LinkButton
          label="新規作成"
          to="create"
        />
      </div>
      <Table<Customer>
        linkTo="customers"
        headerInfo={[
          {
            name: "Id",
            onClick: () => { },
          },
          {
            name: "Name",
            onClick: () => { },
          },
        ]}
        contentInfo={[
          {
            getValueFunc: (e) => e.id.toString()
          },
          {
            getValueFunc: (e) => e.name
          },
        ]}
        content={customeres}
      ></Table>
      <Link to="/">トップに戻る</Link>
      {
        import.meta.env.DEV
          ?
          <pre>
            {
              JSON.stringify(customeres, null, 2)
            }
          </pre>
          :
          <></>
      }
    </main>
  )
}
