import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const article = sqliteTable("article", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  cover: text("cover").notNull().default(""),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  readingTime: integer("reading_time").notNull().default(5),
  status: text("status").notNull().default("draft"),
  publishedAt: integer("published_at").notNull().default(Date.now()),
  createdAt: integer("created_at").notNull().default(Date.now()),
  updatedAt: integer("updated_at").notNull().default(Date.now()),
  categoryId: text("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
})

export const category = sqliteTable("category", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: integer("created_at").notNull().default(Date.now()),
  updatedAt: integer("updated_at").notNull().default(Date.now()),
})

export const subscriber = sqliteTable("subscriber", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at").notNull().default(Date.now()),
  updatedAt: integer("updated_at").notNull().default(Date.now()),
})
