import { eq, like, asc, desc } from "drizzle-orm";
import { db } from "~/infra/db";
import { authorTable } from "~/infra/db/schema";
import type { Author } from "~/types";
import type { AuthorRepositoryService } from "../AuthorRepositoryService";

export class AuthorRepositoryForDrizzle implements AuthorRepositoryService {
  findAllAuthor = async (
    name?: string,
    sortOrder?: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<Author[]> => {

    // orderBy 文字列から、カラムのオブジェクトに変換
    const obi = authorTable.id;
    const obn= authorTable.name;
    let ob = orderBy && orderBy === "name" ? obn : obi;

    return (await db.select()
      .from(authorTable)
      .where(name ? like(authorTable.name, `%${name}%`) : undefined)
      .orderBy(sortOrder === 'desc' ? desc(ob) : asc(ob))
      .limit(limit ? limit : 10)
      .offset(page ? (page - 1) * (limit ? limit : 10) : 0)
    );
  }

  findAuthorById = async (id: number): Promise<Author> => {
    return (await db.select().from(authorTable).where(eq(authorTable.id, id)))[0]
  }

  createAuthor = async (authors: { name: string }[]): Promise<{ id: number, name: string }[]> => {
    return await db.insert(authorTable).values(authors).returning();
  }

  updateAuthor = async (id: number, author: { name: string }) => {
    return await db.update(authorTable)
      .set(author)
      .where(eq(authorTable.id, Number(id)))
      .returning();
  }

  deleteAuthor = async (id: number) => {
    await db.delete(authorTable)
      .where(eq(authorTable.id, id));
  }
}
