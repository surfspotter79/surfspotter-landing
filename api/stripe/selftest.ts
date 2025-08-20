// api/stripe/selftest.ts
import { stripe } from '../lib/stripe.js';

export default async function handler(req: any, res: any) {
  try {
    const acct = await stripe.accounts.retrieve();
    res.status(200).json({ ok: true, account: acct.id, livemode: acct.livemode, type: acct.type });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message, type: err.type, code: err.code });
  }
}
