ALTER TABLE "books" ALTER COLUMN "bookCondition" SET DATA TYPE "public"."book_condition";--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "bookCondition" SET DEFAULT 'new';