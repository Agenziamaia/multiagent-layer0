/**
 * Constants for AI Website Builder landing page
 */

// Pricing tiers
export const pricingTiers = [
  {
    id: "basic",
    name: "Basic",
    price: 797,
    description: "Perfect for simple business sites",
    features: [
      "3 pages",
      "Contact form",
      "1 revision",
      "Mobile responsive",
      "Basic SEO",
      "14-day support",
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: 1197,
    description: "Most popular choice",
    features: [
      "5 pages",
      "Blog integration",
      "SEO optimized",
      "2 revisions",
      "Mobile responsive",
      "Social media integration",
      "30-day support",
      "Analytics setup",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 1497,
    description: "Complete business solution",
    features: [
      "Unlimited pages",
      "CMS included",
      "Custom domain setup",
      "5 revisions",
      "Advanced SEO",
      "E-commerce ready",
      "60-day support",
      "Priority development",
      "Custom branding",
      "Analytics dashboard",
    ],
    popular: false,
  },
] as const;

// Testimonials
export const testimonials = [
  {
    id: 1,
    quote:
      "Delivered my restaurant site in 2 days! The design is incredible and my customers love the new online ordering system.",
    author: "Joe's Pizza",
    role: "Restaurant Owner",
    location: "New York, NY",
  },
  {
    quote:
      "More professional than my old WordPress site. The mobile experience is flawless and bookings increased by 40% in the first week.",
    author: "Lisa's Yoga",
    role: "Yoga Studio",
    location: "Los Angeles, CA",
  },
  {
    quote:
      "Finally affordable web design that actually delivers. My auto repair shop looks like a Fortune 500 company now.",
    author: "Mike's Auto Repair",
    role: "Auto Shop Owner",
    location: "Chicago, IL",
  },
] as const;

// FAQ items
export const faqItems = [
  {
    id: 1,
    question: "How long does it take?",
    answer:
      "Most websites are delivered within 48 hours after we receive your content and requirements. Complex projects may take up to 72 hours. We guarantee delivery or your money back.",
  },
  {
    id: 2,
    question: "Can I edit my website later?",
    answer:
      "Yes! With our Standard and Premium plans, you get a user-friendly CMS that allows you to update content, add blog posts, and manage pages without any coding knowledge.",
  },
  {
    id: 3,
    question: "Do you provide hosting?",
    answer:
      "We provide 1 year of free hosting with all plans. After that, hosting is $29/month. We handle all technical aspects including security, backups, and updates.",
  },
  {
    id: 4,
    question: "What if I'm not satisfied?",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not happy with the initial design, we'll make unlimited revisions at no extra cost. If you're still not satisfied, we'll refund your payment in full.",
  },
  {
    id: 5,
    question: "Is this good for small businesses?",
    answer:
      "Absolutely! We specialize in small business websites. Our pricing is designed to be affordable while delivering enterprise-quality designs. Over 500 small businesses trust us with their online presence.",
  },
] as const;

// Features
export const features = [
  {
    id: 1,
    icon: "⚡",
    title: "48-Hour Delivery",
    description:
      "Lightning fast turnaround vs traditional agencies' 2-4 weeks. Get online in days, not months.",
  },
  {
    id: 2,
    icon: "✨",
    title: "Professional Design",
    description:
      "No generic templates. Every design is custom-crafted to match your brand and stand out from competitors.",
  },
  {
    id: 3,
    icon: "📱",
    title: "Mobile-First",
    description:
      "Perfect on all devices. Your site looks amazing on phones, tablets, and desktops automatically.",
  },
  {
    id: 4,
    icon: "🔍",
    title: "SEO Optimized",
    description:
      "Built-in SEO best practices help you rank higher on Google and get found by customers faster.",
  },
] as const;

// Contact info
export const contactInfo = {
  email: "hello@websitebuilder.ai",
  year: new Date().getFullYear(),
};
