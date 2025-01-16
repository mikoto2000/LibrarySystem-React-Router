// TODO: interface を切って drizzle 実装として実装しなおす
// TODO: View の type を剥がして service のモデルとして再定義
import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { bookMasterTable, bookStockStatusTable, bookStockTable } from "~/infra/db/schema";
import type { BookStockWithoutAuthor } from "~/views/types";


export const findAllBookStock = async (): Promise<BookStockWithoutAuthor[]> => {
  const selectResult = await db.select()
    .from(bookStockTable)
    .innerJoin(bookMasterTable, eq(bookStockTable.bookMasterId, bookMasterTable.id))
    .innerJoin(bookStockStatusTable, eq(bookStockTable.bookStockStatusId, bookStockStatusTable.id));

  return selectResult.map((e) => {
    return {
      id: e.book_stock.id,
      bookStockStatus: e.book_stock_status,
      bookMaster: e.bookMaster,
      memo: e.book_stock.memo ? e.book_stock.memo : ""
    }
  });
}

export const findBookStockById = async (id: number) => {
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

