ALTER TABLE "comments" ALTER COLUMN "content" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "content" SET DEFAULT 'default';