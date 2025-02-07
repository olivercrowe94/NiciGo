import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Science } from "@/components/sections/science";
import { Testimonials } from "@/components/sections/testimonials";
import { Products } from "@/components/sections/products";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Products />
      <Science />
      <Testimonials />
    </main>
  );
}