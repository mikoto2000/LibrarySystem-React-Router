// TODO: service 層に移動
import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, bookMasterToAuthorTable } from "~/infra/db/schema";
import type { BookMaster } from "~/types";
import type { BookMasterList } from "~/views/types";

export const findAllBookMaster = async (): Promise<BookMasterList> => {
  const selectResult = await db.select().from(bookMasterTable);

  return selectResult.map((e) => {
    return {
      id: e.id,
      isbn: e.isbn,
      name: e.name,
      publicationDate: e.publicationDate,
    }
  });
};

export const findBookMasterById = async (id: number): Promise<BookMaster> => {
  const selectResult = (await db.select()
    .from(bookMasterTable)
    .leftJoin(bookMasterToAuthorTable, eq(bookMasterTable.id, bookMasterToAuthorTable.bookMasterId))
    .leftJoin(authorTable, eq(bookMasterToAuthorTable.authorId, authorTable.id))
    .where(eq(bookMasterTable.id, Number(id))));

  const bookMaster = selectResult.reduce((acumulator, currentValue) => {
    acumulator.id = currentValue.bookMaster.id;
    acumulator.isbn = currentValue.bookMaster.isbn;
    acumulator.name = currentValue.bookMaster.name;
    currentValue.author
    if (currentValue.author) {
      acumulator.authors.push(currentValue.author)
    }
    return acumulator;
  },
    {
      id: 0,
      isbn: "",
      name: "",
      authors: [],
    } as BookMaster);

  return bookMaster;
}
