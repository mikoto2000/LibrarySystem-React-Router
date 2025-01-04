import type { Route } from "./+types/bookMaster";
import { BookMasterEditPage } from "../../pages/bookMaster/BookMasterEditPage";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, bookMasterToAuthorTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";
import type { BookMaster } from "~/types";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const insertResult = await db.update(bookMasterTable)
      .set({ name })
      .where(eq(bookMasterTable.id, Number(id)))
      .returning();

    return redirect(`/bookMasters/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const selectResult = (await db.select()
    .from(bookMasterTable)
    .leftJoin(bookMasterToAuthorTable, eq(bookMasterTable.id, bookMasterToAuthorTable.bookMasterId))
    .leftJoin(authorTable, eq(bookMasterToAuthorTable.authorId, authorTable.id))
    .where(eq(bookMasterTable.id, Number(id))));
  const authors = (await db.select().from(authorTable));

  const bookMaster = selectResult.reduce((acumulator, currentValue) => {
    acumulator.id = currentValue.bookMaster.id;
    acumulator.isbn = currentValue.bookMaster.isbn;
    acumulator.name = currentValue.bookMaster.name;
    currentValue.author
    if (currentValue.author) {
      acumulator.authors.push(currentValue.author)
    }
    return acumulator;
  },
    {
      id: 0,
      isbn: "",
      name: "",
      authors: [],
    } as BookMaster);

  return { bookMaster, authors };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookMasterEdit({ loaderData }: Route.ComponentProps) {
  return <BookMasterEditPage
    bookMaster={loaderData.bookMaster}
    authors={loaderData.authors}
  />;
}

