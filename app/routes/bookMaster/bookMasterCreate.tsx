import type { Route } from "./+types/bookMasterCreate";
import { BookMasterCreatePage } from "../../pages/bookMaster/BookMasterCreatePage";
import { db } from "~/infra/db";
import { bookMasterTable } from "~/infra/db/schema";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const isbn = formData.get("isbn")?.toString()
  const name = formData.get("name")?.toString()
  const publicationDate = formData.get("publicationDate")?.toString()
  if (isbn && name && publicationDate) {
    const bookMaster: typeof bookMasterTable.$inferInsert = {
      isbn,
      name,
      publicationDate,
    };
    const insertResult = await db.insert(bookMasterTable).values(bookMaster).returning();

    return redirect(`/bookMasters/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BookMasterCreate() {
  return <BookMasterCreatePage />;
}


