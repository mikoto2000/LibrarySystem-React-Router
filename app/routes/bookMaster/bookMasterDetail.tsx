import type { Route } from "./+types/bookMaster";
import { BookMasterDetailPage } from "../../pages/bookMaster/BookMasterDetailPage";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, bookMasterToAuthorTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";
import type { BookMaster } from "~/types";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;

  const selectResult = (await db.select().from(bookMasterTable)
                      .leftJoin(bookMasterToAuthorTable, eq(bookMasterTable.id, bookMasterToAuthorTable.bookMasterId))
                      .leftJoin(authorTable, eq(bookMasterToAuthorTable.authorId, authorTable.id))
                      .where(eq(bookMasterTable.id, Number(id))));

  const bookMaster = selectResult.reduce((acumulator, currentValue) => {
    acumulator.id = currentValue.bookMaster.id;
    acumulator.isbn = currentValue.bookMaster.isbn;
    acumulator.name = currentValue.bookMaster.name;
    acumulator.authors.push(currentValue.author)
    return acumulator;
  },
  {
    id: 0,
    isbn: "",
    name: "",
    author: [],
  } as BookMaster);

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

