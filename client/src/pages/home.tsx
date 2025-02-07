import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Science } from "@/components/sections/science";
import { Testimonials } from "@/components/sections/testimonials";
import { WaitlistForm } from "@/components/sections/waitlist-form";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Science />
      <Testimonials />
      <WaitlistForm />
    </main>
  );
}
