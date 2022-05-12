import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';
import Stripe from 'stripe';
import { Handler } from '../types';
import { getHandler } from '../utils';

if (!process.env.STRIPE_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_SECRET_KEY'));
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

const post: Handler = async (req, res) => {
  const { customer } = req.body;

  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(customer, {
      type: 'card',
    });

    const { data } = paymentMethods;

    const currentPaymentMethod = data.sort((a, b) => b.created - a.created)[0];

    res.status(200).send({
      id: currentPaymentMethod.id,
      brand: currentPaymentMethod.card?.brand,
      last4: currentPaymentMethod.card?.last4,
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
