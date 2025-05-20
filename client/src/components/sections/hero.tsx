import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { BrainIcon } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-deep-charcoal relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-2xl"
          >
            <h1 className="font-heading font-light text-6xl md:text-7xl mb-6 leading-tight">
              Mental
              <br /> 
              <span className="text-soft-mint">Focus</span>
              <br />
              Enhanced
            </h1>
            <p className="text-xl text-pure-white/80 mb-8 font-body">
              Discover our clinically-tested nicotine lozenges available in 2mg and 4mg strengths for improved cognitive performance and mental agility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#store">SHOP NOW</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#benefits">LEARN MORE</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Product image */}
              <div className="bg-gradient-to-b from-transparent to-deep-charcoal/80 absolute inset-0 z-10 rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1563295918023-9c1dfb47e8c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="NiciGo Nicotine Lozenges" 
                className="rounded-3xl object-cover w-full max-w-md mx-auto relative z-0 shadow-xl"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-5 -left-10 w-32 h-32 rounded-full border border-soft-mint/20 z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border border-soft-mint/30 z-0"></div>
              
              {/* Focus indicator */}
              <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 z-20">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-2 border-soft-mint/30 flex items-center justify-center bg-deep-charcoal/50 backdrop-blur-sm">
                    <div className="text-soft-mint">
                      <BrainIcon className="h-8 w-8" />
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-soft-mint mt-2">Focus</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-midnight-blue/50 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-focus-orange/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-soft-mint/5 rounded-full filter blur-3xl"></div>
    </section>
  );
}