import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { PackageSearch, ShoppingCart, Check, Star, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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

  const oneTimeProducts = products.filter(p => !p.isSubscription);
  const subscriptionProducts = products.filter(p => p.isSubscription);

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
            Select from our one-time purchases or save with a subscription
          </p>
        </div>

        <Tabs defaultValue="onetime" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="onetime">One-Time Purchase</TabsTrigger>
            <TabsTrigger value="subscription">
              Monthly Subscription
              <Badge variant="secondary" className="ml-2">Recommended</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="onetime">
            <div className="grid md:grid-cols-2 gap-8">
              {oneTimeProducts.map((product) => (
                <motion.div key={product.id} variants={fadeIn}>
                  <Card>
                    <CardContent className="pt-6">
                      <PackageSearch className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                      <p className="text-4xl font-bold mb-4">
                        ${Number(product.price).toFixed(2)}
                      </p>
                      <p className="text-muted-foreground mb-6">
                        {product.description}
                      </p>
                      <div className="text-lg mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <PackageSearch className="w-4 h-4" />
                          <span>{product.strength}mg strength</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{product.packSize} lozenges per pack</span>
                        </div>
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
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscription">
            <div className="grid md:grid-cols-2 gap-8">
              {subscriptionProducts.map((product) => (
                <motion.div key={product.id} variants={fadeIn}>
                  <Card className="relative border-primary">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Best Value
                      </Badge>
                    </div>
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
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-2">
                          <PackageSearch className="w-4 h-4" />
                          <span>{product.strength}mg strength</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{product.packSize} lozenges per month</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Star className="w-4 h-4" />
                          <span>Earn 10% rewards balance monthly</span>
                        </div>
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

            <div className="mt-8 p-6 bg-card rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Subscription Benefits</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Earn 10% of your subscription cost as rewards balance each month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Free shipping on all subscription orders</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Flexible delivery schedule - pause or cancel anytime</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
}