import { relations } from "drizzle-orm";
import { integer, date, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const authorTable = pgTable("author", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const bookStockStatusTable = pgTable("book_stock_status", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const lendingStatusTable = pgTable("lending_status", {
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
  bookStockStatusId: integer("book_stock_status_id").references(() => bookStockStatusTable.id),
  bookMasterId: integer("book_master_id").references(() => bookMasterTable.id),
  memo: text(),
});

export const customerTable = pgTable("customer", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  emailAddress: varchar({ length: 255 }).notNull(),
});

export const lendingSetTable = pgTable("lending_set", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  lendingStatusId: integer("lending_status_id").notNull().references(() => lendingStatusTable.id),
  customerId: integer("customer_id").notNull().references(() => customerTable.id),
  lendStartDate: date().notNull(),
  lendDeadlineDate: date().notNull(),
  returnDate: date(),
  memo: text(),
});

export const lendingSetToBookStockTable = pgTable(
  'lending_set_to_book_stock',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    lendingSetId: integer("lending_set_id")
      .notNull()
      .references(() => bookMasterTable.id),
    bookStockId: integer("book_stock_id")
      .notNull()
      .references(() => authorTable.id),
  },
);

export const lendingSetRelations = relations(bookMasterTable, ({ many }) => (
  {
    lendingSetToBookStock: many(bookMasterToAuthorTable),
  }
));

export const bookStockRelations = relations(authorTable, ({ many }) => (
  {
    lendingSetToBookStock: many(bookMasterToAuthorTable)
  }
));

export const lendingSetToBookStockRelations = relations(bookMasterToAuthorTable, ({ one }) => ({
  lendingSetId: one(lendingSetTable, {
    fields: [lendingSetToBookStockTable.bookMasterId],
    references: [lendingSetTable.id],
  }),
  bookStockId: one(bookStockTable, {
    fields: [lendingSetToBookStockTable.authorId],
    references: [bookStockTable.id],
  }),
}));

