// TODO: interface を切って drizzle 実装として実装しなおす
import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";
import type { Author } from "~/types";

export const findAllAuthor = async (): Promise<Author[]> => {
  return (await db.select().from(authorTable));
}

export const findAuthorById = async (id: number): Promise<Author> => {
  return (await db.select().from(authorTable).where(eq(authorTable.id, id)))[0]
}

export const createAuthor = async (authors: { name: string }[]): Promise<{ id: number, name: string }[]> => {
  return await db.insert(authorTable).values(authors).returning();
}

export const updateAuthor = async (id: number, author: { name: string }) => {
  return await db.update(authorTable)
    .set(author)
    .where(eq(authorTable.id, Number(id)))
    .returning();
}

export const deleteAuthor = async (id: number) => {
  await db.delete(authorTable)
    .where(eq(authorTable.id, id));
}
