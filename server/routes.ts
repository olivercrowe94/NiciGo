import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";
import { setupAuth } from "./auth";

export function registerRoutes(app: Express) {
  // Setup authentication routes and middleware
  setupAuth(app);

  // Product routes
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    if (!req.session.id) {
      return res.status(401).json({ error: "No session found" });
    }
    const items = await storage.getCartItems(req.session.id);
    res.json(items);
  });

  app.post("/api/cart", async (req, res) => {
    if (!req.session.id) {
      return res.status(401).json({ error: "No session found" });
    }

    try {
      const item = insertCartItemSchema.parse({
        ...req.body,
        sessionId: req.session.id
      });
      const result = await storage.addToCart(item);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid data provided" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const updatedItem = await storage.updateCartItem(id, quantity);
    if (!updatedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json(updatedItem);
  });

  app.delete("/api/cart/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.removeFromCart(id);
    res.status(204).end();
  });

  return createServer(app);
}