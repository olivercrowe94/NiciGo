import { type TargetAndTransition, type Variant } from "framer-motion";

export const fadeIn: Record<string, Variant> = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const staggerContainer: TargetAndTransition = {
  transition: {
    staggerChildren: 0.2
  }
};

export const scaleIn: Record<string, Variant> = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
