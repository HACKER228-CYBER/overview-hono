import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }),
});

export const ProductsTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 9255 }).default(
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit blanditiis quas debitis dolorem excepturi dolore exercitationem, fugiat nam, asperiores architecto officiis veniam neque vitae pariatur voluptatum ut aperiam? Quisquam quam quis quia minima repellat, temporibus quo! Nemo minima, dicta distinctio vitae amet hic odio doloremque iusto vel cum quod illum neque mollitia et cumque labore quas officia quibusdam. Voluptate, facilis. Sequi molestias corporis aut sunt, alias voluptatem? Placeat dolorum excepturi voluptates numquam nulla, atque molestiae reiciendis adipisci quis eos. Quis, incidunt! Reprehenderit aliquam porro odit dolore esse laboriosam quaerat dolor consectetur, perspiciatis iure hic consequuntur quam maiores obcaecati sequi vel!"
  ),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => usersTable.id),
});

export const CommentsTable = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  content: text("content").notNull().default("default"),
  productId: integer("product_id")
    .notNull()
    .references(() => ProductsTable.id),
  // description: varchar({ length: 255 }).notNull().default("Default"),
  // mystore: varchar({ length: 255 }).notNull().default("Default"),
});

// export const up = async (db: any) => {
//   await db.schema.alterTable("comments", (table: any) => {
//     table.varchar(255)("desc").alter(); // Change to text
//     // table.text("store").alter(); // Change to text
//   });
// };

// export const down = async (db: any) => {
//   await db.schema.alterTable("comments", (table: any) => {
//     table.text("desc").alter(); // Revert back to varchar
//     // table.varchar(255)("store").alter(); // Revert back to varchar
//   });
// };
