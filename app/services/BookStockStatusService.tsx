import { db } from "~/infra/db";
import { bookStockStatusTable } from "~/infra/db/schema";
import type { BookStockStatus } from "~/types";

export const findAllBookStockStatus = async (): Promise<BookStockStatus[]> => {
  return await db.select().from(bookStockStatusTable);
}
