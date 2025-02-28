import type { Route } from "./+types/bookMasterCreate";
import { BookMasterCreatePage } from "../../views/pages/bookMaster/BookMasterCreatePage";
import { redirect } from "react-router";
import { authorRepository, bookMasterRepository } from "~/di";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const isbn = formData.get("isbn")?.toString();
  const name = formData.get("name")?.toString();
  const publicationDate = formData.get("publicationDate")?.toString();
  const authorIds = formData.getAll("authors").map((e) => Number(e));
  if (isbn && name && publicationDate && authorIds) {
    const bookMaster = await bookMasterRepository.createBookMaster([
      {
        isbn,
        name,
        publicationDate,
        authorIds,
      }
    ]);

    return redirect(`/bookMasters/${bookMaster[0].id}`);
  } else {
    throw new Response("Invalid Parameter", { status: 400 })
  }
}

export async function loader({ }: Route.LoaderArgs) {
  const authors = await authorRepository.findAllAuthor();

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

