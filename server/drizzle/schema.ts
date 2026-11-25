import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: varchar("id", { length: 36 }).primaryKey(),
  fullNameEn: varchar("full_name_en", { length: 255 }).notNull(),
  fullNameAr: varchar("full_name_ar", { length: 255 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  bioEn: text("bio_en").notNull(),
  bioAr: text("bio_ar").notNull(),
  avatarUrl: text("avatar_url"),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 64 }),
  locationEn: varchar("location_en", { length: 255 }),
  locationAr: varchar("location_ar", { length: 255 }),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  resumeUrl: text("resume_url"),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const skill = pgTable("skill", {
  id: varchar("id", { length: 36 }).primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  category: varchar("category", { length: 128 }).notNull(),
  level: integer("level").notNull().default(50),
  icon: text("icon"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const project = pgTable("project", {
  id: varchar("id", { length: 36 }).primaryKey(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  imageUrl: text("image_url"),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  tags: text("tags").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const contactMessage = pgTable("contact_message", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type Profile = typeof profile.$inferSelect;
export type Skill = typeof skill.$inferSelect;
export type Project = typeof project.$inferSelect;
export type ContactMessage = typeof contactMessage.$inferSelect;
