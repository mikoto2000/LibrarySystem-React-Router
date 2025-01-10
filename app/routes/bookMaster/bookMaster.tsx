import type { Route } from "./+types/bookMaster";
import { BookMasterPage } from "../../pages/bookMaster/BookMasterPage";
import { db } from "~/infra/db";
import { bookMasterTable } from "~/infra/db/schema";
import type { BookMasterList } from "~/views/types";

export async function loader() {
  const selectResult = await db.select().from(bookMasterTable);

  const bookMasters: BookMasterList = selectResult.map((e) => {
    return {
      id: e.id,
      isbn: e.isbn,
      name: e.name,
      publicationDate: e.publicationDate,
    }
  });

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

