
import Stripe from 'stripe';

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  const { priceEnv } = req.body;
  const priceId = process.env[priceEnv];

  if (!priceId) return res.status(400).json({error:'Invalid price'});

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cancel`
    });
    console.log("Checkout Session Created:", session.id);
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
}
