import { z } from "zod";

// User interface
export interface User {
  id: string;
  username: string;
  name: string;
  rewardBalance: number;
  createdAt: Date;
}

// Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  isSubscription: boolean;
}

// Cart item interface
export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
  sessionId: string;
}

// Validation schemas using Zod
export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  isSubscription: z.boolean().default(false),
});

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

// Type aliases for form data
export type UserFormData = z.infer<typeof userSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type CartItemFormData = z.infer<typeof cartItemSchema>;