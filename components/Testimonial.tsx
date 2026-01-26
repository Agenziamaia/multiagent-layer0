"use client";

import { motion } from "framer-motion";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  location: string;
  index: number;
}

export default function Testimonial({
  quote,
  author,
  role,
  location,
  index,
}: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all"
    >
      <div className="absolute -top-4 left-8 text-6xl text-primary/20">"</div>

      <blockquote className="relative">
        <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
          {quote}
        </p>

        <div className="flex items-start justify-between">
          <div>
            <cite className="not-italic font-bold text-lg">{author}</cite>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>

          <div className="text-right">
            <div className="flex gap-1 mb-2">
              <span className="text-primary">★</span>
              <span className="text-primary">★</span>
              <span className="text-primary">★</span>
              <span className="text-primary">★</span>
              <span className="text-primary">★</span>
            </div>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
        </div>
      </blockquote>
    </motion.div>
  );
}
