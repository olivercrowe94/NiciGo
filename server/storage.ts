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
        name: "Light Strength Lozenges",
        description: "2mg nicotine lozenges for lighter cravings",
        strength: 2,
        packSize: 20,
        price: "24.99",
        isSubscription: false,
        imageUrl: "/images/product-2mg.png"
      },
      {
        name: "Regular Strength Lozenges",
        description: "4mg nicotine lozenges for stronger cravings",
        strength: 4,
        packSize: 20,
        price: "29.99",
        isSubscription: false,
        imageUrl: "/images/product-4mg.png"
      },
      {
        name: "Monthly Subscription - Light",
        description: "Customizable monthly delivery of 2mg nicotine lozenges. Save more and earn 10% rewards each month!",
        strength: 2,
        packSize: 60,
        price: "59.99",
        isSubscription: true,
        imageUrl: "/images/subscription-2mg.png"
      },
      {
        name: "Monthly Subscription - Regular",
        description: "Customizable monthly delivery of 4mg nicotine lozenges. Save more and earn 10% rewards each month!",
        strength: 4,
        packSize: 60,
        price: "69.99",
        isSubscription: true,
        imageUrl: "/images/subscription-4mg.png"
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