CREATE TABLE "logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"user_id" varchar NOT NULL,
	"device" varchar(256) NOT NULL,
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"total" integer NOT NULL,
	"month" integer NOT NULL,
	"user_id" varchar NOT NULL,
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"metadata" jsonb NOT NULL,
	"user_id" varchar NOT NULL,
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reports_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"updated" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;