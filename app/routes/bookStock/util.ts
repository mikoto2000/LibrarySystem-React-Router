import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { bookMasterTable, bookStockStatusTable, bookStockTable } from "~/infra/db/schema";
import type { BookStock } from "~/types";

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

  const bookStock: BookStock = {
    id: selectResult.book_stock.id,
    bookStockStatus: selectResult.book_stock_status,
    bookMaster: {
      id: selectResult.bookMaster.id,
      isbn: selectResult.bookMaster.isbn,
      name: selectResult.bookMaster.name,
    },
    memo: selectResult.book_stock.memo,
  };

  return bookStock;
}
