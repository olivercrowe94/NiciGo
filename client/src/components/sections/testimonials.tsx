import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1507209696998-3c532be9b2b5",
    quote: "This product has completely transformed my workday. My focus and productivity have never been better."
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    quote: "I'm amazed by how much more clearly I can think and solve complex problems. A game-changer."
  },
  {
    name: "Emily Rodriguez",
    role: "Medical Researcher",
    image: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22",
    quote: "The cognitive benefits are backed by solid science. I recommend it to all my colleagues."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/50">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-4xl font-bold text-center mb-16">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">{testimonial.quote}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
