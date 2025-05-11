// import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
// import { usersTable } from "../../db/schema.js";

// export const ProductsTable = pgTable("products", {
//   id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   ownerId: integer("owner_id")
//     .notNull()
//     .references(() => usersTable.id),
// });

import * as v from "valibot";

export const ProductSchema = v.object({
  name: v.string(),
  description: v.string(),
  ownerId: v.number(),
});

export interface IProduct {
  name: string;
  description: string;
  ownerId: number;
}
