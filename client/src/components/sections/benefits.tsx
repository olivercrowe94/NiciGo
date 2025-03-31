import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Brain, Focus, Lightbulb, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    number: "01",
    title: "Enhanced Focus",
    description: "Experience heightened concentration and mental clarity for extended periods of deep work."
  },
  {
    number: "02",
    title: "Improved Cognitive Function",
    description: "Boost your brain's processing speed and problem-solving capabilities for complex tasks."
  },
  {
    number: "03",
    title: "Increased Productivity",
    description: "Get more done in less time with sustained mental energy and reduced mental fatigue."
  },
  {
    number: "04",
    title: "Fast-Acting Relief",
    description: "Feel the effects within minutes of consumption for immediate mental performance enhancement."
  },
  {
    number: "05",
    title: "Discreet & Convenient",
    description: "Easy to take anywhere, anytime without interrupting your workflow or daily activities."
  }
];

export function Benefits() {
  return (
    <section className="py-24 bg-deep-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-soft-mint/20 to-transparent"></div>
      
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <motion.div variants={fadeIn} className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6 leading-tight">
              Experience Peak<br/>
              <span className="text-soft-mint">Mental Performance</span>
            </h2>
            <p className="text-xl text-pure-white/70 mb-8">
              Our nicotine lozenges are scientifically formulated to enhance cognitive function and provide mental clarity when you need it most.
            </p>
            <Button variant="text">
              LEARN MORE
            </Button>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="w-24 h-24 rounded-full border border-soft-mint/30 hidden lg:flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full border border-soft-mint flex items-center justify-center">
              <Brain className="w-8 h-8 text-soft-mint" />
            </div>
          </motion.div>
        </div>
        
        <div className="space-y-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="border-b border-soft-mint/10 pb-8 last:border-b-0"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-4xl font-heading font-extralight text-focus-orange">
                  {benefit.number}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-normal mb-2">{benefit.title}</h3>
                  <p className="text-pure-white/70">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-focus-orange/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 -left-12 w-48 h-48 bg-soft-mint/5 rounded-full filter blur-3xl"></div>
    </section>
  );
}
