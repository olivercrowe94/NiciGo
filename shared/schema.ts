import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  packSize: integer("pack_size").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull()
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  sessionId: text("session_id").notNull()
});

export const insertProductSchema = createInsertSchema(products).omit({ 
  id: true 
});

export const insertCartItemSchema = createInsertSchema(cartItems)
  .omit({ 
    id: true 
  })
  .extend({
    quantity: z.number().min(1, "Quantity must be at least 1")
  });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type Product = typeof products.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;