ALTER TABLE "metrics" RENAME COLUMN "timestamp" TO "created";--> statement-breakpoint
ALTER TABLE "reports" RENAME COLUMN "timestamp" TO "created";--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "created" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "updated" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "metrics" ADD COLUMN "updated" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "updated" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "activities" DROP COLUMN "timestamp";