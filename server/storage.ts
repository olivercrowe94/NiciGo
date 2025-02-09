import { 
  products, cartItems, users,
  type Product, type CartItem, type User,
  type InsertProduct, type InsertCartItem, type InsertUser
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  createUser(user: Omit<InsertUser, "confirmPassword">): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;

  // Cart operations
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;

  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private usernameToId: Map<string, number>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.usernameToId = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Initialize with default products
    const defaultProducts: InsertProduct[] = [
      {
        name: "Essential Pack",
        description: "Perfect starter pack for enhanced focus and clarity",
        packSize: 20,
        price: "39.99",
        imageUrl: "/images/product-20.png"
      },
      {
        name: "Performance Pack",
        description: "Ideal for consistent users seeking better value",
        packSize: 40,
        price: "69.99",
        imageUrl: "/images/product-40.png"
      },
      {
        name: "Professional Pack",
        description: "Best value for dedicated high-performers",
        packSize: 60,
        price: "89.99",
        imageUrl: "/images/product-60.png"
      }
    ];

    defaultProducts.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  // User operations
  async createUser(userData: Omit<InsertUser, "confirmPassword">): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...userData,
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    this.usernameToId.set(userData.username, id);
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const id = this.usernameToId.get(username);
    if (!id) return undefined;
    return this.users.get(id);
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  // Cart operations
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const cartItem: CartItem = { ...item, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }
}

export const storage = new MemStorage();