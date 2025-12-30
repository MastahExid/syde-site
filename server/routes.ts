import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // FAQs
  app.get(api.faqs.list.path, async (_req, res) => {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  });

  // Team
  app.get(api.team.list.path, async (_req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  // Guides
  app.get(api.guides.list.path, async (_req, res) => {
    const guides = await storage.getGuides();
    res.json(guides);
  });

  app.get(api.guides.get.path, async (req, res) => {
    const guide = await storage.getGuideBySlug(req.params.slug);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }
    res.json(guide);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingFaqs = await storage.getFaqs();
  if (existingFaqs.length === 0) {
    await storage.createFaq({
      question: "Is a computer required?",
      answer: "No! Once you have Syde installed, everything is handled directly on your device through our unique VPN tunnel method."
    });
    await storage.createFaq({
      question: "Do I need to jailbreak?",
      answer: "Not at all. Syde works on standard iOS versions without any jailbreak required."
    });
    await storage.createFaq({
      question: "Will my apps expire?",
      answer: "Apps signed with a free developer account expire every 7 days, but Syde refreshes them automatically in the background."
    });
  }

  const existingTeam = await storage.getTeamMembers();
  if (existingTeam.length === 0) {
    await storage.createTeamMember({
      name: "Exid",
      role: "Lead Developer",
      description: "Core infrastructure and backend services.",
      avatarUrl: "https://github.com/exid.png" // Placeholder
    });
    await storage.createTeamMember({
      name: "Dyllie",
      role: "UI/UX Designer",
      description: "Crafting the beautiful interface and user experience.",
      avatarUrl: "https://github.com/dyllie.png" // Placeholder
    });
  }

  const existingGuides = await storage.getGuides();
  if (existingGuides.length === 0) {
    await storage.createGuide({
      title: "Getting Started with Syde",
      excerpt: "Learn how to install Syde on your iOS device in just a few steps.",
      content: "Step 1: Download the IPA... Step 2: Install via AltStore or SideStore first time... Step 3: Trust the certificate...",
      slug: "getting-started"
    });
    await storage.createGuide({
      title: "Fixing App Icons",
      excerpt: "Tutorial on how to customize and fix app icons within Syde.",
      content: "Sometimes app icons might not load correctly. Here is how to refresh the icon cache...",
      slug: "fixing-app-icons"
    });
  }
}
