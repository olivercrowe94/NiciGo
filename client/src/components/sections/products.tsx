import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Brain, ShoppingCart, Check, Zap, Activity, Lightbulb } from "lucide-react";
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
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Mock product type to replace the imported one
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  isSubscription: boolean;
}

export function Products() {
  const { toast } = useToast();
  const [selectedStandardPlan, setSelectedStandardPlan] = useState<string | null>(null);
  const [selectedPremiumPlan, setSelectedPremiumPlan] = useState<string | null>(null);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
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

  const handleAddToCart = async (productId: string, isPremium: boolean) => {
    try {
      await addToCartMutation.mutateAsync(productId);
      if (isPremium) {
        setSelectedPremiumPlan(productId);
      } else {
        setSelectedStandardPlan(productId);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  // Filter products (assuming standard = 2mg, premium = 4mg)
  const standardProducts = products.filter(p => !p.isSubscription);
  const premiumProducts = products.filter(p => p.isSubscription);

  // Product features with icons
  const productFeatures = [
    { icon: Brain, label: "Enhanced Focus" },
    { icon: Zap, label: "Mental Clarity" },
    { icon: Activity, label: "Improved Performance" },
    { icon: Lightbulb, label: "Cognitive Boost" }
  ];

  return (
    <section className="py-24 bg-midnight-blue/30 relative overflow-hidden" id="pricing">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-soft-mint/20 to-transparent"></div>
      <div className="absolute -top-64 right-0 w-96 h-96 bg-soft-mint/5 rounded-full filter blur-3xl"></div>
      
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <motion.div variants={fadeIn} className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-heading font-light mb-6 leading-tight">
              Boost Your <span className="text-soft-mint">Mental</span> Performance
              <br />
              Two Strength Options
            </h2>
            <p className="text-pure-white/70 text-lg mb-4">
              Choose the nicotine lozenge strength that best fits your needs for enhanced focus and cognitive function.
            </p>
            <Badge className="bg-soft-mint/20 text-soft-mint border-none hover:bg-soft-mint/30">
              Clinically Tested
            </Badge>
          </motion.div>
          
          <motion.div variants={fadeIn} className="hidden lg:block">
            <Button variant="default" size="lg">VIEW OPTIONS</Button>
          </motion.div>
        </div>

        <Tabs defaultValue="standard" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-deep-charcoal/50 p-1 rounded-xl">
            <TabsTrigger value="standard" className="rounded-lg text-sm font-medium uppercase tracking-wider">2mg Strength</TabsTrigger>
            <TabsTrigger value="premium" className="rounded-lg text-sm font-medium uppercase tracking-wider">
              4mg Strength
              <Badge variant="outline" className="ml-2 bg-focus-orange/10 text-focus-orange border-none">Maximum Focus</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standard">
            <div className="grid md:grid-cols-2 gap-8">
              {standardProducts.length > 0 ? standardProducts.map((product) => (
                <motion.div key={product.id} variants={fadeIn}>
                  <Card className="h-full">
                    <CardHeader>
                      <h3 className="text-2xl font-heading font-light mb-2">{product.name || "2mg Nicotine Lozenge"}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-soft-mint/20 rounded-full p-1.5">
                          <Brain className="w-5 h-5 text-soft-mint" />
                        </div>
                        <span className="text-pure-white/80">Moderate Strength</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-heading font-light mb-4">
                        £{Number(product.price || 19.99).toFixed(2)}
                      </p>
                      <p className="text-pure-white/70 mb-6">
                        {product.description || "Our 2mg nicotine lozenge provides a gentle cognitive boost for improved focus and mental clarity."}
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {productFeatures.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-soft-mint/30 flex items-center justify-center">
                              <feature.icon className="w-4 h-4 text-soft-mint" />
                            </div>
                            <span className="text-sm text-pure-white/80">{feature.label}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => handleAddToCart(product.id, false)}
                        disabled={selectedStandardPlan === product.id || addToCartMutation.isPending}
                      >
                        {selectedStandardPlan === product.id ? (
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
              )) : (
                <motion.div variants={fadeIn} className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <h3 className="text-2xl font-heading font-light mb-2">2mg Nicotine Lozenge</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-soft-mint/20 rounded-full p-1.5">
                          <Brain className="w-5 h-5 text-soft-mint" />
                        </div>
                        <span className="text-pure-white/80">Moderate Strength</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-heading font-light mb-4">
                        £24.99
                      </p>
                      <p className="text-pure-white/70 mb-6">
                        Our 2mg nicotine lozenge provides a gentle cognitive boost for improved focus and mental clarity.
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {productFeatures.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-soft-mint/30 flex items-center justify-center">
                              <feature.icon className="w-4 h-4 text-soft-mint" />
                            </div>
                            <span className="text-sm text-pure-white/80">{feature.label}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="lg"
                        className="w-full"
                      >
                        ADD TO CART
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="premium">
            <div className="grid md:grid-cols-2 gap-8">
              {premiumProducts.length > 0 ? premiumProducts.map((product) => (
                <motion.div key={product.id} variants={fadeIn}>
                  <Card className="relative h-full border-soft-mint/30">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-focus-orange text-pure-white border-none">
                        MAXIMUM STRENGTH
                      </Badge>
                    </div>
                    <CardHeader>
                      <h3 className="text-2xl font-heading font-light mb-2">{product.name || "4mg Nicotine Lozenge"}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-focus-orange/20 rounded-full p-1.5">
                          <Brain className="w-5 h-5 text-focus-orange" />
                        </div>
                        <span className="text-pure-white/80">Maximum Strength</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-heading font-light mb-4">
                        £{Number(product.price || 24.99).toFixed(2)}
                      </p>
                      <p className="text-pure-white/70 mb-6">
                        {product.description || "Our 4mg nicotine lozenge delivers maximum cognitive enhancement for peak mental performance and intense focus."}
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-soft-mint" />
                          <span>Higher cognitive boost</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-soft-mint" />
                          <span>Extended focus duration</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-soft-mint" />
                          <span>Enhanced mental clarity</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-soft-mint" />
                          <span>Maximum performance</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => handleAddToCart(product.id, true)}
                        disabled={selectedPremiumPlan === product.id || addToCartMutation.isPending}
                      >
                        {selectedPremiumPlan === product.id ? (
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
              )) : (
                <motion.div variants={fadeIn} className="md:col-span-2">
                  <Card className="relative h-full border-soft-mint/30">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-focus-orange text-pure-white border-none">
                        MAXIMUM STRENGTH
                      </Badge>
                    </div>
                    <CardHeader>
                      <h3 className="text-2xl font-heading font-light mb-2">4mg Nicotine Lozenge</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-focus-orange/20 rounded-full p-1.5">
                          <Brain className="w-5 h-5 text-focus-orange" />
                        </div>
                        <span className="text-pure-white/80">Maximum Strength</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-heading font-light mb-4">
                        £29.99
                      </p>
                      <p className="text-pure-white/70 mb-6">
                        Our 4mg nicotine lozenge delivers maximum cognitive enhancement for peak mental performance and intense focus.
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-soft-mint" />
                          <span>Higher cognitive boost</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-soft-mint" />
                          <span>Extended focus duration</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-soft-mint" />
                          <span>Enhanced mental clarity</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-soft-mint" />
                          <span>Maximum performance</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => handleAddToCart("premium-lozenge", true)}
                        disabled={selectedPremiumPlan === "premium-lozenge" || addToCartMutation.isPending}
                      >
                        {selectedPremiumPlan === "premium-lozenge" ? (
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
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
}