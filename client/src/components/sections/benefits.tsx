import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Brain, Focus, Lightbulb, Clock, Zap, Beaker, FlaskConical, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

const scienceCards = [
  {
    icon: Beaker,
    title: "Cognitive Enhancement",
    description: "Nicotine has been extensively studied for its ability to enhance cognitive function. Research shows it can improve attention, focus, and memory formation through its action on nicotinic acetylcholine receptors."
  },
  {
    icon: FlaskConical,
    title: "Precision Formulation",
    description: "Our 2mg and 4mg nicotine lozenges are precisely formulated to provide optimal cognitive benefits with minimal side effects. Our proprietary delivery system ensures consistent release for sustained performance."
  },
  {
    icon: BookOpen,
    title: "Clinical Evidence",
    description: "Clinical studies have shown that controlled nicotine administration can significantly improve attention span, working memory, and information processing speed. Our lozenges provide a clean, controlled delivery method without the harmful effects associated with smoking."
  }
];

export function Benefits() {
  return (
    <section className="py-24 bg-deep-charcoal relative overflow-hidden" id="benefits">
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
        
        <div className="space-y-8 mb-24">
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

        <motion.div variants={fadeIn} className="mt-20">
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-12 text-center">
            The <span className="text-soft-mint">Science</span> Behind NiciGo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {scienceCards.map((card, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="bg-card/50 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-soft-mint/10 flex items-center justify-center mb-4">
                      <card.icon className="w-6 h-6 text-soft-mint" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-pure-white/70">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-focus-orange/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 -left-12 w-48 h-48 bg-soft-mint/5 rounded-full filter blur-3xl"></div>
    </section>
  );
}
