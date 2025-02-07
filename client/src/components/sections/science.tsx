import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Card, CardContent } from "@/components/ui/card";

export function Science() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16">The Science</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                  alt="Research"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Clinical Research</h3>
                <p className="text-muted-foreground">
                  Our formula is backed by extensive clinical research and trials,
                  demonstrating significant improvements in cognitive function.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                  alt="Product"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  We use only the highest quality, scientifically-validated
                  ingredients in our proprietary blend.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
