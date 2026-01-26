const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PRODUCTS = {
  BASIC: {
    id: "price_basic_monthly",
    priceId: process.env.STRIPE_PRICE_ID_BASIC || "",
    price: 797,
    currency: "usd",
    interval: "month",
    name: "Basic Plan",
    description: "Perfect for getting started",
  },
  STANDARD: {
    id: "price_standard_monthly",
    priceId: process.env.STRIPE_PRICE_ID_STANDARD || "",
    price: 1197,
    currency: "usd",
    interval: "month",
    name: "Standard Plan",
    description: "Best for growing businesses",
  },
  PREMIUM: {
    id: "price_premium_monthly",
    priceId: process.env.STRIPE_PRICE_ID_PREMIUM || "",
    price: 1497,
    currency: "usd",
    interval: "month",
    name: "Premium Plan",
    description: "For agencies and enterprises",
  },
};

const getSuccessUrl = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  return (
    process.env.STRIPE_SUCCESS_URL ||
    `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`
  );
};

const getCancelUrl = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  return process.env.STRIPE_CANCEL_URL || `${siteUrl}/?canceled=true`;
};

async function getOrCreatePriceId(productId) {
  const envPriceId = process.env[`STRIPE_PRICE_ID_${productId.toUpperCase()}`];
  if (envPriceId) {
    return envPriceId;
  }

  try {
    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
    });

    const existingPrice = prices.data.find(
      (price) => price.metadata?.productId === productId,
    );

    if (existingPrice) {
      return existingPrice.id;
    }
  } catch (error) {
    console.error("Error listing prices:", error);
  }

  const productConfig = PRODUCTS[productId];
  if (!productConfig) {
    throw new Error(`Invalid product ID: ${productId}`);
  }

  const product = await stripe.products.create({
    name: productConfig.name,
    description: productConfig.description,
    metadata: {
      productId,
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: productConfig.price * 100,
    currency: productConfig.currency,
    recurring: {
      interval: productConfig.interval,
    },
    metadata: {
      productId,
    },
  });

  return price.id;
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const { productId, userId, metadata = {} } = body;

      if (!productId) {
        return res.status(400).json({
          error: "productId is required",
        });
      }

      const productConfig = PRODUCTS[productId];
      if (!productConfig) {
        return res.status(400).json({
          error: `Invalid product ID: ${productId}`,
        });
      }

      const priceId = await getOrCreatePriceId(productId);

      const sessionParams = {
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

      return res.status(200).json({
        sessionId: session.id,
        url: session.url,
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);

      if (error.type) {
        return res.status(error.statusCode || 500).json({
          error: error.message || "Failed to create checkout session",
          type: error.type,
        });
      }

      return res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  if (req.method === "GET") {
    try {
      const { session_id } = req.query;

      if (!session_id) {
        return res.status(400).json({
          error: "session_id is required",
        });
      }

      const session = await stripe.checkout.sessions.retrieve(session_id);

      return res.status(200).json({
        session: {
          id: session.id,
          customer: session.customer,
          subscription: session.subscription,
          payment_status: session.payment_status,
          status: session.status,
          metadata: session.metadata,
        },
      });
    } catch (error) {
      console.error("Error retrieving checkout session:", error);

      return res.status(500).json({
        error: "Failed to retrieve session",
        message: error.message,
      });
    }
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
};
