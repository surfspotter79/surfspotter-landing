import { stripe } from '../lib/stripe.js';
import { getPhotographer, upsertPhotographer } from '../lib/data.js';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const photographerId = (req.query?.photographerId as string) || '';
    if (!photographerId) return res.status(400).json({ error: 'photographerId is required' });

    const photographer = getPhotographer(photographerId) || upsertPhotographer({ id: photographerId });

    if (!photographer.stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'CH',
        capabilities: { transfers: { requested: true } },
        business_type: 'individual',
      });
      upsertPhotographer({ id: photographerId, stripeAccountId: account.id });
    }

    const refresh_url = `${process.env.SITE_URL}/onboarding/refresh`;
    const return_url  = `${process.env.SITE_URL}/onboarding/return`;

    const link = await stripe.accountLinks.create({
      account: getPhotographer(photographerId)!.stripeAccountId!,
      refresh_url,
      return_url,
      type: 'account_onboarding',
    });

    return res.status(200).json({ url: link.url });
  } catch (err: any) {
    console.error('onboard error:', err);
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
