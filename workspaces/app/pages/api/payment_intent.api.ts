import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import Stripe from 'stripe';
import { Handler } from './types';
import { getHandler } from './utils';

if (!process.env.STRIPE_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_SECRET_KEY'));
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

const post: Handler = async (req, res) => {
  try {
    // Temporary
    // Must validate amount server side
    const { amount, assetId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      capture_method: 'manual',
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: 'Error' });
  }
};

export default getHandler({ post });
