import type { Route } from "./+types/authorDetail";
import { AuthorDetailPage } from "../../views/pages/author/AuthorDetailPage";
import { authorRepository } from "~/di";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const author = await authorRepository.findAuthorById(Number(id));

  return { author };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AuthorDetail({ loaderData }: Route.ComponentProps) {
  return <AuthorDetailPage
    author={loaderData.author}
  />;
}

