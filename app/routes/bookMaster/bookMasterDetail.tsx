import type { Route } from "./+types/bookMaster";
import { BookMasterDetailPage } from "../../pages/bookMaster/BookMasterDetailPage";
import { db } from "~/infra/db";
import { bookMasterTable } from "~/infra/db/schema";

import { eq } from "drizzle-orm";

export async function loader({ params, request }: Route.LoaderArgs) {
  const id = params.id;
  const bookMaster = (await db.select().from(bookMasterTable).where(eq(bookMasterTable.id, Number(id))))[0];
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


