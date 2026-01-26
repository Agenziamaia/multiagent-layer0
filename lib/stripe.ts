/**
 * Stripe Integration
 * Handles checkout sessions and payment processing
 */

import { loadStripe, Stripe } from "@stripe/stripe-js";
import type { CheckoutSession } from "@/types/stripe";

// Stripe configuration
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

// Product configurations
export const PRODUCTS = {
  BASIC: {
    id: "price_basic_monthly",
    name: "Basic Plan",
    description: "Perfect for getting started",
    price: 797, // $797
    currency: "usd",
    interval: "month",
    features: [
      "Up to 5 websites",
      "Basic templates",
      "Email support",
      "5GB storage",
    ],
  },
  STANDARD: {
    id: "price_standard_monthly",
    name: "Standard Plan",
    description: "Best for growing businesses",
    price: 1197, // $1,197
    currency: "usd",
    interval: "month",
    features: [
      "Up to 25 websites",
      "Premium templates",
      "Priority support",
      "25GB storage",
      "Custom domains",
      "Analytics dashboard",
    ],
  },
  PREMIUM: {
    id: "price_premium_monthly",
    name: "Premium Plan",
    description: "For agencies and enterprises",
    price: 1497, // $1,497
    currency: "usd",
    interval: "month",
    features: [
      "Unlimited websites",
      "All premium templates",
      "24/7 phone support",
      "Unlimited storage",
      "Custom domains",
      "Advanced analytics",
      "White-label option",
      "API access",
      "Priority feature requests",
    ],
  },
} as const;

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    if (!STRIPE_PUBLIC_KEY) {
      console.error("STRIPE_PUBLIC_KEY environment variable is not set");
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
}

/**
 * Create a checkout session
 * This function calls your backend API to create a Stripe checkout session
 */
export async function createCheckoutSession(
  productId: string,
  userId?: string,
  metadata?: Record<string, string>,
): Promise<{ sessionId: string; error?: string }> {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        userId,
        metadata,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        sessionId: "",
        error: error.message || "Failed to create checkout session",
      };
    }

    const data = await response.json();
    return { sessionId: data.sessionId };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      sessionId: "",
      error: "Network error. Please try again.",
    };
  }
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(
  productId: string,
  userId?: string,
  metadata?: Record<string, string>,
): Promise<{ success: boolean; error?: string }> {
  const stripe = await getStripe();

  if (!stripe) {
    return {
      success: false,
      error: "Payment system is not available. Please contact support.",
    };
  }

  const { sessionId, error } = await createCheckoutSession(
    productId,
    userId,
    metadata,
  );

  if (error) {
    return { success: false, error };
  }

  if (!sessionId) {
    return {
      success: false,
      error: "Failed to initialize checkout. Please try again.",
    };
  }

  try {
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (stripeError) {
      return {
        success: false,
        error: stripeError.message || "Failed to redirect to checkout",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error redirecting to checkout:", error);
    return {
      success: false,
      error: "Failed to redirect to checkout. Please try again.",
    };
  }
}

/**
 * Get product by ID
 */
export function getProduct(productId: string) {
  return Object.values(PRODUCTS).find((product) => product.id === productId);
}

/**
 * Get all products
 */
export function getAllProducts() {
  return Object.values(PRODUCTS);
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Type definitions
 */
export type Product = (typeof PRODUCTS)[keyof typeof PRODUCTS];
