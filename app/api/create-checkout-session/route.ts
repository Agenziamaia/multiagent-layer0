/**
 * Create Stripe Checkout Session API Route
 * Handles the server-side creation of Stripe checkout sessions
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

// Product configurations (must match client-side)
const PRODUCTS = {
  BASIC: {
    id: "price_basic_monthly",
    priceId: "", // Will be set from environment or Stripe product
    price: 797,
  },
  STANDARD: {
    id: "price_standard_monthly",
    priceId: "",
    price: 1197,
  },
  PREMIUM: {
    id: "price_premium_monthly",
    priceId: "",
    price: 1497,
  },
} as const;

// Get success and cancel URLs from environment
const getSuccessUrl = (): string => {
  return (
    process.env.STRIPE_SUCCESS_URL ||
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`
  );
};

const getCancelUrl = (): string => {
  return (
    process.env.STRIPE_CANCEL_URL ||
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}?canceled=true`
  );
};

// Create or get Stripe price ID
async function getOrCreatePriceId(productId: string): Promise<string> {
  // Check if price ID is already configured in environment
  const envPriceId = process.env[`STRIPE_PRICE_ID_${productId.toUpperCase()}`];
  if (envPriceId) {
    return envPriceId;
  }

  // Try to list existing prices
  try {
    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
    });

    // Find matching price by metadata or lookup key
    const existingPrice = prices.data.find(
      (price) => price.metadata?.productId === productId,
    );

    if (existingPrice) {
      return existingPrice.id;
    }
  } catch (error) {
    console.error("Error listing prices:", error);
  }

  // Create new price if not found
  const productConfig = PRODUCTS[productId as keyof typeof PRODUCTS];
  if (!productConfig) {
    throw new Error(`Invalid product ID: ${productId}`);
  }

  const product = await stripe.products.create({
    name:
      productConfig.id
        .replace("price_", "")
        .replace("_monthly", "")
        .toUpperCase() + " Plan",
    description: `${productId.toLowerCase()} plan for AI Website Builder`,
    metadata: {
      productId,
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: productConfig.price * 100, // Convert to cents
    currency: "usd",
    recurring: {
      interval: "month",
    },
    metadata: {
      productId,
    },
  });

  return price.id;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, userId, metadata = {} } = body;

    // Validate required fields
    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 },
      );
    }

    // Validate product exists
    const productConfig = PRODUCTS[productId as keyof typeof PRODUCTS];
    if (!productConfig) {
      return NextResponse.json(
        { error: `Invalid product ID: ${productId}` },
        { status: 400 },
      );
    }

    // Get or create price ID
    const priceId = await getOrCreatePriceId(productId);

    // Create checkout session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: getSuccessUrl(),
      cancel_url: getCancelUrl(),
      metadata: {
        productId,
        userId: userId || "anonymous",
        ...metadata,
      },
      customer_email: metadata.email || undefined,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_creation: "always",
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    // Return session ID
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);

    // Handle Stripe errors
    if (error.type) {
      return NextResponse.json(
        {
          error: error.message || "Failed to create checkout session",
          type: error.type,
        },
        { status: error.statusCode || 500 },
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// GET handler to retrieve session info
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id is required" },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      session: {
        id: session.id,
        customer: session.customer,
        subscription: session.subscription,
        payment_status: session.payment_status,
        status: session.status,
        metadata: session.metadata,
      },
    });
  } catch (error: any) {
    console.error("Error retrieving checkout session:", error);

    return NextResponse.json(
      {
        error: "Failed to retrieve session",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
