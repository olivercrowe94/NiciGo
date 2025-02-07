import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Brain, Zap, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Brain,
    title: "Enhanced Focus",
    description: "Experience laser-sharp concentration that lasts for hours"
  },
  {
    icon: Zap,
    title: "Mental Clarity",
    description: "Think faster and clearer with improved cognitive processing"
  },
  {
    icon: Clock,
    title: "Better Memory",
    description: "Retain and recall information with exceptional accuracy"
  },
  {
    icon: TrendingUp,
    title: "Peak Performance",
    description: "Achieve optimal mental performance when it matters most"
  }
];

export function Benefits() {
  return (
    <section className="py-24 bg-muted/50">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-4xl font-bold text-center mb-16">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card>
                <CardContent className="pt-6">
                  <benefit.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
