// api/stripe/checkout.ts
import Stripe from "stripe";

// ✅ Use a supported runtime:
export const config = { runtime: "nodejs" };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string); // no apiVersion literal to avoid TS mismatch

type Body = {
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  items: Array<{
    name: string;
    amount: number;        // cents
    quantity?: number;     // default 1
    metadata?: Record<string, string>;
  }>;
};

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { currency = "eur", successUrl, cancelUrl, items } = (req.body ?? {}) as Body;

    if (!successUrl || !cancelUrl || !Array.isArray(items)) {
      return res.status(400).json({ error: "Missing fields: successUrl, cancelUrl, items[]" });
    }

    const line_items = items.map((i) => ({
      quantity: i.quantity ?? 1,
      price_data: {
        currency,
        unit_amount: i.amount,
        product_data: { name: i.name },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items,
      metadata: items[0]?.metadata,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message ?? "Internal error" });
  }
}
