import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const authorTable = pgTable("author", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const bookMasterTable = pgTable("bookMaster", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  isbn: varchar({ length: 16 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  publicationDate: date().notNull(),
  authorId: integer("author_id").references(() => authorTable.id)
});
