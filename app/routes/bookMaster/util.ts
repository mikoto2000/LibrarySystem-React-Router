// TODO: service 層に移動
import { eq } from "drizzle-orm";
import { db } from "~/infra/db";
import { authorTable, bookMasterTable, bookMasterToAuthorTable } from "~/infra/db/schema";
import type { Author, BookMaster } from "~/types";
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
    acumulator.publicationDate = currentValue.bookMaster.publicationDate;
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
      publicationDate: "",
      authors: [],
    } as BookMaster);

  return bookMaster;
}

export const createBookMaster = async (bookMasters: { isbn: string, name: string, publicationDate: string, authorIds: number[] }[]): Promise<{ id: number, isbn: string, name: string, publicationDate: string }[]> => {

  const insertResult = await db.insert(bookMasterTable).values(bookMasters).returning();

  for (var i = 0; i < insertResult.length; i++) {
    const authorIds = bookMasters[i].authorIds;
    const bm2autherEntries = authorIds.map((e) => {
      return {
        bookMasterId: insertResult[i].id,
        authorId: e,
      }
    });
    await db.insert(bookMasterToAuthorTable).values(bm2autherEntries);
  }

  return insertResult;
}

export const updateBookMaster = async (id: number, values: {
  isbn: string,
  name: string,
  publicationDate: string,
  authorIds: number[],
}) => {

  // 指定 ID のエンティティを更新
  const insertResult = await db.update(bookMasterTable)
    .set({
      isbn: values.isbn,
      name: values.name,
      publicationDate: values.publicationDate,
    })
    .where(eq(bookMasterTable.id, Number(id)))
    .returning();

    // 中間テーブルの既存エントリー削除
    await db.delete(bookMasterToAuthorTable)
      .where(eq(bookMasterToAuthorTable.bookMasterId, id));

    // 中間テーブルにエントリー登録
    const bookMasterToAuthors = values.authorIds.map((e) => {
      return {
        bookMasterId: insertResult[0].id,
        authorId: Number(e.toString()),
      }
    });
    await db.insert(bookMasterToAuthorTable).values(bookMasterToAuthors).returning();
}

export const deleteBookMaster = async (id: number) => {
  await db.delete(bookMasterToAuthorTable)
    .where(eq(bookMasterToAuthorTable.bookMasterId, Number(id)));
  await db.delete(bookMasterTable)
    .where(eq(bookMasterTable.id, Number(id)));
}

