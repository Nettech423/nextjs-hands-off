
import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("Webhook Event Received:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    console.log("Payment completed for session:", event.data.object.id);
  }

  res.json({ received: true });
}
