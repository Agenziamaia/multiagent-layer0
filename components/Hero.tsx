"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            I'll Build Your Business Website{" "}
            <span className="block text-primary-foreground/90">
              in 48 Hours
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl mb-10 text-primary-foreground/80 max-w-3xl mx-auto"
          >
            Professional, custom, fast. Not another Wix site.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToPricing}
              className="px-8 py-4 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-primary-foreground/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              Get Started - $797
            </button>

            <button
              onClick={scrollToFeatures}
              className="px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/20 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/20 transition-all transform hover:scale-105 text-lg"
            >
              See Examples
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/70"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>48-Hour Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>100% Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
