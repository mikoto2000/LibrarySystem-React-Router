import type { Route } from "./+types/bookMaster";
import { BookMasterEditPage } from "../../pages/bookMaster/BookMasterEditPage";
import { db } from "~/infra/db";
import { bookMasterTable } from "~/infra/db/schema";
import { redirect } from "react-router";

import { eq } from "drizzle-orm";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (id && name) {
    const insertResult = await db.update(bookMasterTable)
      .set({name})
      .where(eq(bookMasterTable.id, Number(id)))
      .returning();

    return redirect(`/bookMasters/${insertResult[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
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

export default function BookMasterEdit({ loaderData }: Route.ComponentProps) {
	return <BookMasterEditPage
		bookMaster={loaderData.bookMaster}
	/>;
}



