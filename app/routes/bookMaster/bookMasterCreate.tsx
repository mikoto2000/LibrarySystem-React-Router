import type { Route } from "./+types/bookMasterCreate";
import { BookMasterCreatePage } from "../../views/pages/bookMaster/BookMasterCreatePage";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, bookMasterToAuthorTable } from "~/infra/db/schema";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const isbn = formData.get("isbn")?.toString();
  const name = formData.get("name")?.toString();
  const publicationDate = formData.get("publicationDate")?.toString();
  const authors = formData.getAll("authors");
  if (isbn && name && publicationDate && authors) {
    const bookMaster: typeof bookMasterTable.$inferInsert = {
      isbn,
      name,
      publicationDate,
    };
    const insertResult = await db.insert(bookMasterTable).values(bookMaster).returning();

    const bookMasterToAuthors = authors.map((e) => {
      return {
        authorId: Number(e.toString()),
        bookMasterId: insertResult[0].id,
      }
    });
    await db.insert(bookMasterToAuthorTable).values(bookMasterToAuthors);

    return redirect(`/bookMasters/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ }: Route.LoaderArgs) {
  const authors = (await db.select().from(authorTable));

  return { authors };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookMasterCreate({ loaderData }: Route.ComponentProps) {
  return <BookMasterCreatePage
    authors={loaderData.authors}
  />;
}

