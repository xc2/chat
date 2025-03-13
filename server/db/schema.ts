import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const example = pgTable("example", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  foo: varchar({ length: 255 }).notNull(),
  bar: integer().notNull(),
});
