import type { Route } from "./+types/bookMaster";
import { BookMasterPage } from "../../views/pages/bookMaster/BookMasterPage";
import type { BookMasterList } from "~/views/types";
import { bookMasterRepository } from "~/di";

export async function loader() {

  const bookMasters: BookMasterList = await bookMasterRepository.findAllBookMaster();

  return { bookMasters };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return <BookMasterPage
    bookMasters={loaderData.bookMasters}
  />;
}

