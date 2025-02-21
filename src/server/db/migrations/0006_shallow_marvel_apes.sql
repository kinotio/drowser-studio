CREATE TABLE "logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"device" varchar(256) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "activities" CASCADE;