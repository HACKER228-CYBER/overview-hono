ALTER TABLE "comments" ALTER COLUMN "desc" SET DEFAULT 'Default desc';--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "desc" DROP NOT NULL;