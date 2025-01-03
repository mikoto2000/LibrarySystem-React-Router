import { relations } from "drizzle-orm";
import { integer, date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const authorTable = pgTable("author", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const bookStockStatusTable = pgTable("book_stock_status", {
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
  'book_master_to_author',
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
    bookMasterToAuthor: many(bookMasterToAuthorTable),
    bookMasterToBookStock: many(bookStockToBookMasterTable)
  }
));

export const authorRelations = relations(authorTable, ({ many }) => (
  {
    bookMasterToAuthor: many(bookMasterToAuthorTable)
  }
));

export const bookMasterToAuthorRelations = relations(bookMasterToAuthorTable, ({ one }) => ({
  bookMaster: one(bookMasterTable, {
    fields: [bookMasterToAuthorTable.bookMasterId],
    references: [bookMasterTable.id],
  }),
  user: one(authorTable, {
    fields: [bookMasterToAuthorTable.authorId],
    references: [authorTable.id],
  }),
}));

export const bookStockTable = pgTable("book_stock", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  bookStockStatus: integer("book_stock_status_id").references(() => bookStockStatusTable.id)
});

export const bookStockToBookMasterTable = pgTable(
  'book_stock_to_book_master',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    bookStockId: integer("book_stock_id")
      .notNull()
      .references(() => bookStockTable.id),
    bookMasterId: integer("book_master_id")
      .notNull()
      .references(() => bookMasterTable.id),
  },
);

export const bookStockToBookMasterRelations = relations(bookStockToBookMasterTable, ({ one }) => ({
  bookStock: one(bookStockTable, {
    fields: [bookStockToBookMasterTable.bookStockId],
    references: [bookStockTable.id],
  }),
  bookMaster: one(bookMasterTable, {
    fields: [bookStockToBookMasterTable.bookMasterId],
    references: [bookMasterTable.id],
  }),
}));

export const bookStockRelations = relations(bookStockTable, ({ many }) => (
  {
    bookStockToBookMaster: many(bookStockToBookMasterTable)
  }
));

