
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req){
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const buf = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, secret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch(event.type){
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('✅ checkout.session.completed:', {
          id: session.id,
          customer_email: session.customer_details?.email,
          amount_total: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status
        });
        break;
      }
      default:
        console.log('ℹ️ Unhandled event:', event.type);
    }
  } catch (err) {
    console.error('Error processing webhook event:', err);
    return new Response('Webhook handler error', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
