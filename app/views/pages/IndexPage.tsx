import { Link } from "react-router"
import { Toc } from "~/components/toc/Toc";
export function IndexPage() {
  const tocItems = [
    {
      title: "マスタ管理",
      item: [
        {
          label: "Book Stock Status",
          to: "/bookStockStatuses",
        },
        {
          label: "Lending Status",
          to: "/lendingStatuses",
        },
      ]
    },
    {
      title: "書籍管理",
      item: [
        {
          label: "Authors",
          to: "/authors",
        },
        {
          label: "Book Masters",
          to: "/bookMasters",
        },
      ]
    },
    {
      title: "在庫管理",
      item: [
        {
          label: "Book Stocks",
          to: "/bookStocks",
        },
      ]
    },
    {
      title: "貸出管理",
      item: [
        {
          label: "Lending Set",
          to: "/lendingSets",
        },
        {
          label: "Customer",
          to: "/customers",
        },
      ]
    },
  ];

  return (
    <main className="bold p-8">
      <Toc
        toc={tocItems}
      />
    </main>
  );
}

