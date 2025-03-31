import { 
  type Product, type CartItem, type User,
  type ProductFormData, type CartItemFormData, type UserFormData
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  createUser(user: UserFormData): Promise<User>;
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;

  // Cart operations
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: CartItemFormData & { sessionId: string }): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;

  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private usernameToId: Map<string, string>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.usernameToId = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Initialize with default products
    const defaultProducts: (ProductFormData & { id: string })[] = [
      {
        id: "1",
        name: "2mg Nicotine Lozenge",
        description: "Our 2mg nicotine lozenge provides a gentle cognitive boost for improved focus and mental clarity.",
        price: 24.99,
        isSubscription: false
      },
      {
        id: "2",
        name: "4mg Nicotine Lozenge",
        description: "Our 4mg nicotine lozenge delivers maximum cognitive enhancement for peak mental performance and intense focus.",
        price: 29.99,
        isSubscription: true
      }
    ];

    defaultProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User operations
  async createUser(userData: UserFormData): Promise<User> {
    const id = Date.now().toString();
    const user: User = {
      ...userData,
      id,
      rewardBalance: 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    this.usernameToId.set(userData.username, id);
    return user;
  }

  async getUser(id: string): Promise<User | undefined> {
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

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  // Cart operations
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addToCart(item: CartItemFormData & { sessionId: string }): Promise<CartItem> {
    const id = Date.now().toString();
    const product = this.products.get(item.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    
    const cartItem: CartItem = { 
      ...item, 
      id,
      product
    };
    
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }
}

export const storage = new MemStorage();