ALTER TABLE "activities" ALTER COLUMN "updated" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "activities" ALTER COLUMN "updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "metrics" ALTER COLUMN "updated" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "metrics" ALTER COLUMN "updated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "updated" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "updated" SET NOT NULL;