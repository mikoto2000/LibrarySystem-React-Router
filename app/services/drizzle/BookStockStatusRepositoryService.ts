import { eq, like, asc, desc } from "drizzle-orm";
import { db } from "~/infra/db";
import { bookStockStatusTable } from "~/infra/db/schema";
import type { BookStockStatus } from "~/types";
import type { BookStockStatusRepositoryService } from "../BookStockStatusRepositoryService";

export class BookStockStatusRepositoryForDrizzle implements BookStockStatusRepositoryService {
  findAllBookStockStatus = async (
    name?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<BookStockStatus[]> => {

    // orderBy 文字列から、カラムのオブジェクトに変換
    const obi = bookStockStatusTable.id;
    const obn= bookStockStatusTable.name;
    let ob = orderBy && orderBy === "name" ? obn : obi;

    return await db.select()
      .from(bookStockStatusTable)
      .where(name ? like(bookStockStatusTable.name, `%${name}%`) : undefined)
      .orderBy(sortOrder === 'desc' ? desc(ob) : asc(ob))
      .limit(limit ? limit : 10)
      .offset(page ? (page - 1) * (limit ? limit : 10) : 0);
  }

  findBookStockStatusById = async (id: number): Promise<BookStockStatus> => {
    return (await db.select().from(bookStockStatusTable).where(eq(bookStockStatusTable.id, id)))[0]
  }

  createBookStockStatus = async (bookStockStatus: { name: string }[]): Promise<{ id: number, name: string }[]> => {
    return await db.insert(bookStockStatusTable).values(bookStockStatus).returning();
  }

  updateBookStockStatus = async (id: number, bookStockStatus: { name: string }) => {
    return await db.update(bookStockStatusTable)
      .set(bookStockStatus)
      .where(eq(bookStockStatusTable.id, Number(id)))
      .returning();
  }

  deleteBookStockStatus = async (id: number) => {
    await db.delete(bookStockStatusTable)
      .where(eq(bookStockStatusTable.id, id));
  }
}
