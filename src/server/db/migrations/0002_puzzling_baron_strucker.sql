ALTER TABLE "activities" ALTER COLUMN "updated" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "metrics" ALTER COLUMN "updated" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "updated" DROP NOT NULL;