import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import net from 'net';

// Set a different initial port to avoid conflicts with client
const PORT = 5003;

// Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  isSubscription: boolean;
}

// Cart item interface
interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

// Mock data for products
const mockProducts: Product[] = [
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

// Mock cart data
let mockCart: CartItem[] = [];

// Function to check if a port is in use
async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    
    server.listen(port);
  });
}

// Function to find an available port
async function findAvailablePort(startPort: number): Promise<number> {
  let port = startPort;
  let attempts = 0;
  const maxAttempts = 10; // Limit the number of attempts
  
  while (await isPortInUse(port) && attempts < maxAttempts) {
    console.log(`Port ${port} is in use, trying next port...`);
    port++;
    attempts++;
  }
  
  if (attempts >= maxAttempts) {
    throw new Error(`Could not find an available port after ${maxAttempts} attempts.`);
  }
  
  return port;
}

const app = express();

// Apply CORS with specific configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'http://localhost:5175'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(mockProducts);
});

// Get cart
app.get("/api/cart", (req, res) => {
  res.json(mockCart);
});

// Add item to cart
app.post("/api/cart", (req, res) => {
  const { productId, quantity } = req.body;
  
  // Find product
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  
  // Add to cart
  mockCart.push({
    id: Date.now().toString(),
    productId,
    quantity,
    product
  });
  
  res.status(201).json({ message: "Product added to cart" });
});

// Start the server
(async () => {
  try {
    console.log('Starting server with mock data (no database connection)');
    
    const server = registerRoutes(app);
    const availablePort = await findAvailablePort(PORT);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Use the available port instead of hardcoded one
    server.listen(availablePort, "0.0.0.0", () => {
      console.log(`Server running on port ${availablePort}`);
      console.log(`API available at http://localhost:${availablePort}/api/products`);
    });

    // Handle server shutdown gracefully
    process.on('SIGINT', async () => {
      console.log('Shutting down server...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
