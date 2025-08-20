// api/stripe/checkout.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia", // or your pinned version
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { items, currency = "eur", successUrl, cancelUrl, customer_email } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "No items provided" });
      return;
    }
    const line_items = items.map((it: any) => ({
      price_data: {
        currency,
        unit_amount: it.amount, // cents (demo only; validate in real app)
        product_data: { name: it.name, metadata: it.metadata || {} },
      },
      quantity: it.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      allow_promotion_codes: true,
      success_url: successUrl || `${req.headers.origin || ""}/live#/thankyou`,
      cancel_url: cancelUrl || `${req.headers.origin || ""}/live#/explore`,
      customer_email,
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err?.message || "Stripe error" });
  }
}
