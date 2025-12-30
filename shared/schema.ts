import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  avatarUrl: text("avatar_url").notNull(),
});

export const guides = pgTable("guides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull().unique(),
});

// === SCHEMAS ===
export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertGuideSchema = createInsertSchema(guides).omit({ id: true });

// === TYPES ===
export type Faq = typeof faqs.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type Guide = typeof guides.$inferSelect;

export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type InsertGuide = z.infer<typeof insertGuideSchema>;
