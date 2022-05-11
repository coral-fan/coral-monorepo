import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';
import Stripe from 'stripe';
import { Handler } from '../types';
import { getHandler } from '../utils';

if (!process.env.STRIPE_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_SECRET_KEY'));
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

const post: Handler = async (req, res) => {
  try {
    // Temporary
    // Must validate amount server side
    const { amount, savePaymentInfo, stripeCustomerId, paymentMethodId, collectionId } = req.body;

    // If user agrees to save info: Assign stripeCustomerId to new variable or create one if it does not exist
    const customerId = savePaymentInfo
      ? stripeCustomerId ?? (await stripe.customers.create()).id
      : undefined;
    console.log(customerId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      setup_future_usage: 'on_session',
      payment_method_types: ['card'],
      capture_method: 'manual',
      payment_method: paymentMethodId,
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      customerId,
    });

    // TODO: Type error properly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    switch (e.type) {
      case 'StripeCardError':
        console.log(`A payment error occurred: ${e.message}`);
        break;
      case 'StripeInvalidRequestError':
        console.log(`An invalid request occurred: ${e.message}`);
        break;
      default:
        console.log(`Another problem occurred, maybe unrelated to Stripe: ${e.message}.`);
        break;
    }
    res.status(500).json({ statusCode: 500, message: e.message });
  }
};

export default getHandler({ post });
