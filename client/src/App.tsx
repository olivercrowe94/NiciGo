import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartDrawer } from "@/components/cart-drawer";
import { UserIcon } from "@/components/user-icon";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import { ZapIcon, TwitterIcon, FacebookIcon, InstagramIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/hooks/use-auth";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
};

function NavigationBar() {
  const [activeItem, setActiveItem] = useState("about");
  
  const navItems = [
    { id: "about", label: "ABOUT", href: "#" },
    { id: "benefits", label: "BENEFITS", href: "#benefits" },
    { id: "store", label: "STORE", href: "#store" }
  ];
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 py-4 bg-deep-charcoal/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-soft-mint rounded-md p-1.5">
            <ZapIcon className="h-5 w-5 text-deep-charcoal" />
          </div>
          <span className="text-xl font-heading font-light text-pure-white tracking-wider">ZONE</span>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map(item => (
              <li 
                key={item.id}
                className="relative"
              >
                <a 
                  href={item.href} 
                  className={`text-nav uppercase hover:text-soft-mint transition-colors ${
                    activeItem === item.id ? "text-soft-mint" : "text-pure-white/80"
                  }`}
                  onClick={() => setActiveItem(item.id)}
                >
                  {item.label}
                </a>
                {activeItem === item.id && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-soft-mint"
                    layoutId="activeNavIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center gap-4">
          <UserIcon />
          <Button variant="text" className="text-pure-white hover:text-soft-mint">
            CONTACT US
          </Button>
          <Button variant="default" className="hidden sm:inline-flex">
            PREORDER
          </Button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-deep-charcoal text-pure-white py-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-soft-mint rounded-md p-1.5">
                <ZapIcon className="h-5 w-5 text-deep-charcoal" />
              </div>
              <span className="text-xl font-heading font-light tracking-wider">ZONE</span>
            </div>
            <p className="text-pure-white/60 max-w-xs font-body">
              Precision-engineered nicotine lozenges for enhanced cognitive performance.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-soft-mint mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Original</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Mint</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Berry</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Citrus</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-soft-mint mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Help Center</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">FAQ</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-soft-mint mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">About</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Science</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Press</a></li>
                <li><a href="#" className="text-pure-white/60 hover:text-soft-mint transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-pure-white/10 mt-12 pt-8 flex flex-col-reverse md:flex-row justify-between gap-4">
          <p className="text-pure-white/40 text-sm">
            © {new Date().getFullYear()} ZONE. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-pure-white/40 hover:text-soft-mint text-sm">Privacy Policy</a>
            <a href="#" className="text-pure-white/40 hover:text-soft-mint text-sm">Terms of Service</a>
            <a href="#" className="text-pure-white/40 hover:text-soft-mint text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider resetCSS={false}>
          <div className="relative">
            <NavigationBar />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Router />
            </motion.div>
            
            <Footer />
          </div>
          <Toaster />
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;