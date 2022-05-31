import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';
import Stripe from 'stripe';
import { object, string } from 'yup';
import { Handler } from '../types';
import { getHandler, getStripe } from '../utils';

const captureAPISchema = object({
  paymentIntentId: string().required(),
});

const stripe = getStripe();

const post: Handler = async (req, res) => {
  try {
    const { paymentIntentId } = await captureAPISchema.validate(req.body);
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);

    console.log(paymentIntent);

    res.status(200).send(`PaymentIntent status: ${paymentIntent.status}`);

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
