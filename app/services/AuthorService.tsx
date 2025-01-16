import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";
import type { Author } from "~/types";

export const findAllAuthor = async (): Promise<Author[]> => {
  return (await db.select().from(authorTable));
}

