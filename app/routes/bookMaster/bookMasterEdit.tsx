import type { Route } from "./+types/bookMasterEdit";
import { BookMasterEditPage } from "../../views/pages/bookMaster/BookMasterEditPage";
import { redirect } from "react-router";

import type { BookMaster } from "~/types";
import { findAllAuthor, findBookMasterById, updateBookMaster } from "./util";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const id = Number(formData.get("id")?.toString());
  const isbn = formData.get("isbn")?.toString();
  const name = formData.get("name")?.toString();
  const publicationDate = formData.get("publicationDate")?.toString();
  const authorIds = formData.getAll("authorIds").map((e) => Number(e));
  if (id && isbn && name && publicationDate) {
     await updateBookMaster(Number(id), {
       isbn,
       name,
       publicationDate,
       authorIds,
     });

    return redirect(`/bookMasters/${id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const authors = await findAllAuthor();

  const bookMaster: BookMaster = await findBookMasterById(Number(id));

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

