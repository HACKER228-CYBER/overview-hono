CREATE TABLE "comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content" varchar(255) NOT NULL,
	"product_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "description" varchar(9255) DEFAULT 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit blanditiis quas debitis dolorem excepturi dolore exercitationem, fugiat nam, asperiores architecto officiis veniam neque vitae pariatur voluptatum ut aperiam? Quisquam quam quis quia minima repellat, temporibus quo! Nemo minima, dicta distinctio vitae amet hic odio doloremque iusto vel cum quod illum neque mollitia et cumque labore quas officia quibusdam. Voluptate, facilis. Sequi molestias corporis aut sunt, alias voluptatem? Placeat dolorum excepturi voluptates numquam nulla, atque molestiae reiciendis adipisci quis eos. Quis, incidunt! Reprehenderit aliquam porro odit dolore esse laboriosam quaerat dolor consectetur, perspiciatis iure hic consequuntur quam maiores obcaecati sequi vel!';--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;