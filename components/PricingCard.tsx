"use client";

import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: readonly string[];
  popular: boolean;
  index: number;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  popular,
  index,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-xl border-2 p-8 ${
        popular
          ? "border-primary bg-primary/5 shadow-xl scale-105"
          : "border-border bg-card hover:border-primary/50 transition-all"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">${price}</span>
        </div>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 ${
          popular
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
}
