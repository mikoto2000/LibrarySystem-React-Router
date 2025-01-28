import { and, eq, like, asc, desc } from "drizzle-orm";
import { db } from "~/infra/db";
import { bookMasterTable, bookStockStatusTable, bookStockTable } from "~/infra/db/schema";
import type { BookStockWithoutAuthor } from "~/views/types";
import type { BookStockRepositoryService } from "../BookStockRepositoryService";

export class BookStockRepositoryForDrizzle implements BookStockRepositoryService {

  findAllBookStock = async (
    name?: string,
    bookStockStatusId?: number,
    memo?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<BookStockWithoutAuthor[]> => {

    // orderBy 文字列から、カラムのオブジェクトに変換
    const obi = bookStockTable.id;
    const obn = bookMasterTable.name;
    const obm = bookStockTable.memo;
    let ob: any = orderBy && orderBy === "name" ? obn : obi;
    ob = orderBy && orderBy === "memo" ? obm : ob;

    const selectResult = await db.select()
      .from(bookStockTable)
      .innerJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
      .innerJoin(bookStockStatusTable, eq(bookStockTable.bookStockStatusId, bookStockStatusTable.id))
      .where(
        and(
          name ? like(bookMasterTable.name, `%${name}%`) : undefined,
          bookStockStatusId ? eq(bookStockTable.bookStockStatusId, bookStockStatusId) : undefined,
          memo ? like(bookStockTable.memo, `%${memo}%`) : undefined),
      )
      .orderBy(sortOrder === 'desc' ? desc(ob) : asc(ob))
      .limit(limit ? limit : 10)
      .offset(page ? (page - 1) * (limit ? limit : 10) : 0);

    return selectResult.map((e) => {
      return {
        id: e.book_stock.id,
        bookStockStatus: e.book_stock_status,
        bookMaster: e.bookMaster,
        memo: e.book_stock.memo ? e.book_stock.memo : ""
      }
    });
  }

  findBookStockById = async (id: number) => {
    const selectResult = (await db.select().from(bookStockTable)
      .leftJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
      .leftJoin(bookStockStatusTable, eq(bookStockTable.bookStockStatusId, bookStockStatusTable.id))
      .where(eq(bookStockTable.id, Number(id))))[0];

    if (!selectResult.book_stock_status) {
      throw "book_stock_status not found"
    }

    if (!selectResult.bookMaster) {
      throw "bookMaster not found"
    }

    const bookStock: BookStockWithoutAuthor = {
      id: selectResult.book_stock.id,
      bookStockStatus: selectResult.book_stock_status,
      bookMaster: {
        id: selectResult.bookMaster.id,
        isbn: selectResult.bookMaster.isbn,
        name: selectResult.bookMaster.name,
        publicationDate: selectResult.bookMaster.publicationDate,
      },
      memo: selectResult.book_stock.memo ? selectResult.book_stock.memo : "",
    };

    return bookStock;
  }

  createBookStock = async (bookStock: {
    bookMasterId: number,
    bookStockStatusId: number,
    memo?: string | null,
  }[]): Promise<{ id: number }[]> => {
    return (await db.insert(bookStockTable).values(bookStock).returning()).map((e) => {
      return { id: e.id }
    });
  }

  updateBookStock = async (id: number,
    bookStock: {
      bookMasterId: number,
      bookStockStatusId: number,
      memo?: string | null
    }) => {
    await db.update(bookStockTable)
      .set(bookStock)
      .where(eq(bookStockTable.id, Number(id)))
      .returning();
  }

  deleteBookStock = async (id: number) => {
    await db.delete(bookStockTable)
      .where(eq(bookStockTable.id, Number(id)));
  }
}

