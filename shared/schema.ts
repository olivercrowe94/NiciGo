import { pgTable, text, serial, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  rewardBalance: decimal("reward_balance", { precision: 10, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  strength: integer("strength").notNull(), // in mg
  packSize: integer("pack_size").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  isSubscription: boolean("is_subscription").default(false).notNull(),
  imageUrl: text("image_url").notNull()
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  sessionId: text("session_id").notNull()
});

export const insertUserSchema = createInsertSchema(users)
  .omit({ 
    id: true,
    createdAt: true,
    rewardBalance: true
  })
  .extend({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;