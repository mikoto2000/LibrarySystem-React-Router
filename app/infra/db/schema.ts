import { relations } from "drizzle-orm";
import { integer, date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const authorTable = pgTable("author", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const bookMasterTable = pgTable("bookMaster", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  isbn: varchar({ length: 16 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  publicationDate: date().notNull(),
});

export const bookMasterToAuthorTable = pgTable(
  'users_to_groups',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    bookMasterId: integer("book_master_id")
      .notNull()
      .references(() => bookMasterTable.id),
    authorId: integer("author_id")
      .notNull()
      .references(() => authorTable.id),
  },
);

export const bookMasterRelations = relations(bookMasterTable, ({ many }) => (
  {
    bookMasterToAuthor: many(bookMasterToAuthorTable)
  }
));
