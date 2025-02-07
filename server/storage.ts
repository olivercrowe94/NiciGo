import { 
  products, cartItems,
  type Product, type CartItem,
  type InsertProduct, type InsertCartItem 
} from "@shared/schema";

export interface IStorage {
  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;

  // Cart operations
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private currentProductId: number;
  private currentCartItemId: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.currentProductId = 1;
    this.currentCartItemId = 1;

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

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

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