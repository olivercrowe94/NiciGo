import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";

export function registerRoutes(app: Express) {
  // Setup session middleware
  const MemoryStoreSession = MemoryStore(session);
  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: true,
      store: new MemoryStoreSession({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      cookie: {
        secure: false, // set to true in production with HTTPS
        maxAge: 86400000 // 24 hours
      }
    })
  );

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