CREATE TABLE "plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"duration" varchar(256) NOT NULL,
	"price" integer NOT NULL,
	"price_id" varchar(256),
	"metadata" jsonb,
	"type" varchar(256) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL
);
