import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Unlock Your Mind's Full Potential
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Experience breakthrough cognitive enhancement backed by science
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => {
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Plans
          </Button>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487700160041-babef9c3cb55')] bg-cover bg-center opacity-5" />
    </section>
  );
}