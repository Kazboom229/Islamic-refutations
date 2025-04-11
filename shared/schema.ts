import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  avatarInitials: text("avatar_initials").notNull(),
  avatarColor: text("avatar_color").notNull(),
  role: text("role").notNull().default("user"), // 'admin', 'user'
  online: boolean("online").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  online: true,
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name_en: text("name_en").notNull(),
  name_so: text("name_so"),
  description_en: text("description_en"),
  description_so: text("description_so"),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull().default("folder"),
  parentId: integer("parent_id"), // For subcategories
  order: integer("order").default(0),
  createdBy: integer("created_by").notNull(), // User ID
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
});

// Articles table - Islamic content, refutations, etc.
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title_en: text("title_en").notNull(),
  title_so: text("title_so"),
  content_en: text("content_en").notNull(),
  content_so: text("content_so"),
  excerpt_en: text("excerpt_en"),
  excerpt_so: text("excerpt_so"),
  slug: text("slug").notNull().unique(),
  featuredImage: text("featured_image"),
  type: text("type").notNull(), // 'evidence', 'refutation', 'faq', etc.
  categoryId: integer("category_id").notNull(),
  tags: jsonb("tags").default([]).notNull(),
  views: integer("views").default(0),
  published: boolean("published").default(false),
  addedBy: integer("added_by").notNull(), // User ID
  relatedArticles: jsonb("related_articles").default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  views: true,
  createdAt: true,
  updatedAt: true,
});

// Media table - For presentations, PDFs, videos, 3D models, etc.
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  title_en: text("title_en").notNull(),
  title_so: text("title_so"),
  description_en: text("description_en"),
  description_so: text("description_so"),
  type: text("type").notNull(), // 'pdf', 'video', '3d', 'image', 'presentation'
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  articleId: integer("article_id"), // Optional link to an article
  categoryId: integer("category_id").notNull(),
  addedBy: integer("added_by").notNull(), // User ID
  tags: jsonb("tags").default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Questions submitted by users
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  question_en: text("question_en").notNull(),
  question_so: text("question_so"),
  status: text("status").notNull().default("pending"), // 'pending', 'answered', 'rejected'
  responseArticleId: integer("response_article_id"), // Link to an article if answered
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
  status: true,
  responseArticleId: true,
  createdAt: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type Media = typeof media.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
