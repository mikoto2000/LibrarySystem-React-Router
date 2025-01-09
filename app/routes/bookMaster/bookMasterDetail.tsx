import type { Route } from "./+types/bookMasterDetail";
import { BookMasterDetailPage } from "../../pages/bookMaster/BookMasterDetailPage";

import { findBookMasterById } from "./util";
import type { BookMaster } from "~/types";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  const bookMaster: BookMaster = await findBookMasterById(Number(id));

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

