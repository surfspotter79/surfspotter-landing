import { stripe } from '../lib/stripe.js';

export const config = { api: { bodyParser: false } };

async function readRawBody(req: any): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c));
  return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const sig = req.headers['stripe-signature'];
  if (!sig) return res.status(400).send('Missing Stripe signature');

  try {
    const raw = await readRawBody(req);
    const event = stripe.webhooks.constructEvent(raw, sig as string, process.env.STRIPE_WEBHOOK_SECRET!);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session: any = event.data.object;
        console.log('✅ Order paid for photoId', session.metadata?.photoId);
        break;
      }
      case 'account.updated': {
        const acct: any = event.data.object;
        console.log('Connected account update:', acct.id, acct.charges_enabled);
        break;
      }
      default:
        console.log('Unhandled event', event.type);
    }
    return res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('webhook error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
