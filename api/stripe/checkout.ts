import { stripe } from '../lib/stripe.js';
import { getPhoto, getPhotographer } from '../lib/data.js';

const PLATFORM_FEE_BPS = 1500; // 15%
const DEFAULT_CURRENCY = (process.env.CURRENCY || 'CHF').toLowerCase();

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { photoId, quantity = 1 } = req.body || {};
    const photo = getPhoto(photoId);
    if (!photo) return res.status(404).json({ error: 'Photo not found' });

    const photographer = getPhotographer(photo.photographerId);
    if (!photographer?.stripeAccountId) {
      return res.status(400).json({ error: 'Photographer not onboarded' });
    }

    const unitAmount = Math.round(Number(photo.priceCHF) * 100);
    const application_fee_amount = Math.floor((unitAmount * PLATFORM_FEE_BPS) / 10000);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      currency: DEFAULT_CURRENCY,
      line_items: [{
        price_data: {
          currency: DEFAULT_CURRENCY,
          product_data: { name: photo.title },
          unit_amount: unitAmount,
        },
        quantity,
      }],
      payment_intent_data: {
        application_fee_amount,
        transfer_data: { destination: photographer.stripeAccountId },
      },
      success_url: `${process.env.SITE_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/purchase/cancelled`,
      metadata: { photoId: photo.id, photographerId: photographer.id },
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err: any) {
    console.error('checkout error:', err);
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
