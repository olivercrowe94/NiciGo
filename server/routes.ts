import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const entry = insertWaitlistSchema.parse(req.body);
      const result = await storage.addToWaitlist(entry);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid data provided" });
    }
  });

  app.get("/api/waitlist/count", async (_req, res) => {
    const count = await storage.getWaitlistCount();
    res.json({ count });
  });

  return createServer(app);
}
