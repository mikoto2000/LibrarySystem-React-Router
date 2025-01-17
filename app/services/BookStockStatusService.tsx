import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { bookStockStatusTable } from "~/infra/db/schema";
import type { BookStockStatus } from "~/types";

export const findAllBookStockStatus = async (): Promise<BookStockStatus[]> => {
  return await db.select().from(bookStockStatusTable);
}

export const createBookStockStatus = async (bookStockStatus: { name: string }[]): Promise<{ id: number, name: string }[]> => {
  return await db.insert(bookStockStatusTable).values(bookStockStatus).returning();
}

export const deleteBookStockStatus = async (id: number) => {
  await db.delete(bookStockStatusTable)
    .where(eq(bookStockStatusTable.id, id));
}
