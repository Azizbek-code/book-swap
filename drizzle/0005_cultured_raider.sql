CREATE TYPE "public"."book_condition" AS ENUM('new', 'old', 'used', 'good');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'company', 'user');