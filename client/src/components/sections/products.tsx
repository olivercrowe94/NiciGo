import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { PackageSearch, ShoppingCart, Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { type Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function Products() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: number) => {
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

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCartMutation.mutateAsync(productId);
      setSelectedPlan(productId);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <section className="py-24 bg-muted/50" id="pricing">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground text-lg">
            Select the perfect pack size for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeIn}>
              <Card className="relative h-full">
                <CardContent className="pt-6">
                  <PackageSearch className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-4xl font-bold mb-4">
                    ${Number(product.price).toFixed(2)}
                    <span className="text-base font-normal text-muted-foreground">
                      /month
                    </span>
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {product.description}
                  </p>
                  <div className="text-lg mb-6">
                    <span className="font-bold">{product.packSize}</span> lozenges per month
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={selectedPlan === product.id || addToCartMutation.isPending}
                  >
                    {selectedPlan === product.id ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Subscribe Now
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}