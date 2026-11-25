CREATE TABLE "contact_message" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"full_name_en" varchar(255) NOT NULL,
	"full_name_ar" varchar(255) NOT NULL,
	"title_en" varchar(255) NOT NULL,
	"title_ar" varchar(255) NOT NULL,
	"bio_en" text NOT NULL,
	"bio_ar" text NOT NULL,
	"avatar_url" text,
	"email" varchar(255),
	"phone" varchar(64),
	"location_en" varchar(255),
	"location_ar" varchar(255),
	"github_url" text,
	"linkedin_url" text,
	"twitter_url" text,
	"resume_url" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title_en" varchar(255) NOT NULL,
	"title_ar" varchar(255) NOT NULL,
	"description_en" text NOT NULL,
	"description_ar" text NOT NULL,
	"image_url" text,
	"live_url" text,
	"github_url" text,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name_en" varchar(255) NOT NULL,
	"name_ar" varchar(255) NOT NULL,
	"category" varchar(128) NOT NULL,
	"level" integer DEFAULT 50 NOT NULL,
	"icon" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
