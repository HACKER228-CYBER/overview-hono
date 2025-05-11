ALTER TABLE "comments" ALTER COLUMN "content" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "mystore";