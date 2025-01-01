import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const authorTable = pgTable("author", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
