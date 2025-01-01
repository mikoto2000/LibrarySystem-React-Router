import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("author", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
