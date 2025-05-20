import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ShoppingCart, Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  strength: string;
  image: string;
}

// Sample products
const storeProducts: Product[] = [
  {
    id: "standard-lozenge",
    name: "NiciGo 2mg Lozenge",
    description: "Our 2mg nicotine lozenge provides a gentle cognitive boost for improved focus and mental clarity.",
    price: 19.99,
    strength: "2mg",
    image: "https://images.unsplash.com/photo-1563450474027-6f8d3e3cf8c1"
  },
  {
    id: "premium-lozenge",
    name: "NiciGo 4mg Lozenge",
    description: "Our 4mg nicotine lozenge delivers maximum cognitive enhancement for peak mental performance and intense focus.",
    price: 24.99,
    strength: "4mg",
    image: "https://images.unsplash.com/photo-1584017197348-33e4a63a5dfe"
  }
];

export function Store() {
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      // Mock API request - in a real app, this would call the actual API
      await apiRequest("POST", "/api/cart", {
        productId,
        quantity: 1
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Success",
        description: "Product added to cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  });

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCartMutation.mutateAsync(productId);
      setSelectedItems([...selectedItems, productId]);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <section className="py-24 bg-deep-charcoal/80 relative overflow-hidden" id="store">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-soft-mint/20 to-transparent"></div>
      
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-light mb-6 leading-tight">
            Shop <span className="text-soft-mint">NiciGo</span> Products
          </h2>
          <p className="text-pure-white/70 text-lg max-w-2xl mx-auto">
            Choose from our precision-engineered nicotine lozenges, designed to enhance cognitive function and provide mental clarity when you need it most.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {storeProducts.map((product) => (
            <motion.div key={product.id} variants={fadeIn}>
              <Card className="h-full overflow-hidden">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-soft-mint text-deep-charcoal">
                    {product.strength} Strength
                  </Badge>
                </div>
                <CardHeader>
                  <h3 className="text-2xl font-heading font-light">{product.name}</h3>
                  <p className="text-3xl font-heading font-light mt-2">£{product.price.toFixed(2)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-pure-white/70">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={selectedItems.includes(product.id) || addToCartMutation.isPending}
                  >
                    {selectedItems.includes(product.id) ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> ADDED TO CART
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" /> ADD TO CART
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-focus-orange/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 -left-12 w-48 h-48 bg-soft-mint/5 rounded-full filter blur-3xl"></div>
    </section>
  );
}
