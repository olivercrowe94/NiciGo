import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Products } from "@/components/sections/products";
import { Store } from "@/components/sections/store";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Products />
      <Store />
    </main>
  );
}