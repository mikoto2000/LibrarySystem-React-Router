import type { Route } from "./+types/bookMasterDetail";
import { BookMasterDetailPage } from "../../views/pages/bookMaster/BookMasterDetailPage";

import { bookMasterRepository } from "~/di";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  const bookMaster = await bookMasterRepository.findBookMasterById(Number(id));

  return { bookMaster };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookMasterDetail({ loaderData }: Route.ComponentProps) {
  return <BookMasterDetailPage
    bookMaster={loaderData.bookMaster}
  />;
}

