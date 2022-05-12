import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import { Handler } from './types';
import { getHandler } from './utils';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next/types';

if (!process.env.STRIPE_WEBHOOK_SIGNING_SECRET) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_WEBHOOK_SIGNING_SECRET'));
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_SECRET_KEY'));
}

const STRIPE_WEBHOOK_SIGNING_SECRET = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

export const post: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = STRIPE_WEBHOOK_SIGNING_SECRET;

  try {
    if (!sig || !webhookSecret) {
      return;
    }
    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

    const { request } = event;
    // TODO: Handle duplicate event using idempotency key from request

    if (event.type === 'payment_intent.amount_capturable_updated') {
      const object = event.data.object as Stripe.PaymentIntent;

      if (object.status === 'requires_capture') {
        // TODO: Call mintNFT utility function with paymentIntentId
        console.log('MINT NFT');
      }
    }

    if (event.type === 'payment_intent.succeeded') {
      const object = event.data.object as Stripe.PaymentIntent;
      // TODO: Send successful mint + capture back to client
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(`Webhook error: ${err.message}`);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
  }
};

export default getHandler({ post });
