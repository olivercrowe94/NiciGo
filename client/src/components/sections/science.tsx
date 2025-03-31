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
          <h2 className="text-4xl font-bold text-center mb-16">The Science Behind NiciGo</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074"
                  alt="Neuroscience Research"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Cognitive Enhancement</h3>
                <p className="text-muted-foreground">
                  Nicotine has been extensively studied for its ability to enhance cognitive function. 
                  Research shows it can improve attention, focus, and memory formation through its action on nicotinic acetylcholine receptors.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1507413245164-6160d8298b31"
                  alt="Laboratory Testing"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Precision Formulation</h3>
                <p className="text-muted-foreground">
                  Our 2mg and 4mg nicotine lozenges are precisely formulated to provide optimal cognitive benefits
                  with minimal side effects. Our proprietary delivery system ensures consistent release for sustained performance.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Clinical Evidence</h3>
                <p className="text-muted-foreground">
                  Clinical studies have shown that controlled nicotine administration can significantly improve attention span, 
                  working memory, and information processing speed. Our lozenges provide a clean, controlled delivery method 
                  without the harmful effects associated with smoking.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
