import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";
import type { Author } from "~/types";

export const findAllAuthor = async (): Promise<Author[]> => {
  return (await db.select().from(authorTable));
}

export const createAuthor = async (authors: { name: string }[]): Promise<{ id: number, name: string }[]> => {
  return await db.insert(authorTable).values(authors).returning();
}
