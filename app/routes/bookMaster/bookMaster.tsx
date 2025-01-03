import type { Route } from "./+types/bookMaster";
import { BookMasterPage } from "../../pages/bookMaster/BookMasterPage";
import { db } from "~/infra/db";
import { bookMasterTable } from "~/infra/db/schema";

export async function loader() {
  const bookMasters = await db.select().from(bookMasterTable);
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

