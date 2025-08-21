// api/stripe/checkout.ts
import Stripe from 'stripe';

export const config = { runtime: '2025-07-30.basil' };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { items = [], currency = 'eur', successUrl, cancelUrl } = req.body ?? {};
    if (!successUrl || !cancelUrl || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Missing items/successUrl/cancelUrl' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((it: any) => ({
        quantity: it.quantity ?? 1,
        price_data: {
          currency,
          product_data: { name: it.name ?? 'Photo' },
          unit_amount: it.amount,
        },
      })),
      metadata: items[0]?.metadata,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Server error' });
  }
}
