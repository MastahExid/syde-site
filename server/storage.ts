import { db } from "./db";
import {
  faqs,
  teamMembers,
  guides,
  type Faq,
  type TeamMember,
  type Guide,
  type InsertFaq,
  type InsertTeamMember,
  type InsertGuide
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getFaqs(): Promise<Faq[]>;
  getTeamMembers(): Promise<TeamMember[]>;
  getGuides(): Promise<Guide[]>;
  getGuideBySlug(slug: string): Promise<Guide | undefined>;
  
  // Seeding methods
  createFaq(faq: InsertFaq): Promise<Faq>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  createGuide(guide: InsertGuide): Promise<Guide>;
}

export class DatabaseStorage implements IStorage {
  async getFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs);
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async getGuides(): Promise<Guide[]> {
    return await db.select().from(guides);
  }

  async getGuideBySlug(slug: string): Promise<Guide | undefined> {
    const [guide] = await db.select().from(guides).where(eq(guides.slug, slug));
    return guide;
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }

  async createGuide(guide: InsertGuide): Promise<Guide> {
    const [newGuide] = await db.insert(guides).values(guide).returning();
    return newGuide;
  }
}

export const storage = new DatabaseStorage();
