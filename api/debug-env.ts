// api/debug-env.ts
export default function handler(req: any, res: any) {
  const raw = process.env.STRIPE_SECRET_KEY || "";
  const mask = (v: string) => (v ? v.slice(0, 6) + "…" + v.slice(-4) : null);
  res.status(200).json({
    hasStripeKey: !!raw,
    stripeKeyPreview: mask(raw),
    stripeKeyLength: raw.length,
    siteUrl: process.env.SITE_URL,
  });
}
