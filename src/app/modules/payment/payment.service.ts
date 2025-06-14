import Stripe from 'stripe';
import stripe from '../../utils/stripe';

const makePayment = async (amount: number, paymentMethodId: string) => {
  // stripe implementation here

  console.log('hit the makePayment function');

  const payment = await stripe.paymentIntents.create({
    amount: amount * 100, // amount in cents
    currency: 'usd',
    payment_method: 'pm_card_visa',
    confirm: true,
    automatic_payment_methods: { enabled: true },
    return_url: 'https://sana-ullah-roton.web.app/',
  });
  console.log(payment);
  return payment;
};

const WebhookStripe = async (sig: string, body: any) => {
  const endpointSecret = 'we_1RZx91Fzo88Og9LwII7gjwMM'; // 5️⃣ Stripe dashboard থেকে পাওয়া webhook secret

  let event: Stripe.Event;

  try {
    // 6️⃣ Signature verify করে আসল event তৈরি করলাম
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err: any) {
    console.error('⚠️ Webhook signature invalid:', err);
    throw new Error(`Webhook Error: ${err.message}`);
  }

  // 7️⃣ এখন বিভিন্ন Event ধরবো (success, fail etc.)
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('✅ Payment succeeded:', paymentIntent.id);

      // 🟢 এখানে database update, email send, order confirm ইত্যাদি করতে পারো
      break;

    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed');
      break;

    default:
      console.log(`⚠️ Unhandled event type: ${event.type}`);
  }

  // 8️⃣ Stripe কে response দিয়ে confirm করলাম
  return { received: true };
};
export const paymentService = {
  makePayment,
  WebhookStripe,
};
