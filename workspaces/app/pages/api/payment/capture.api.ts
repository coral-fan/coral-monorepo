import { object, string } from 'yup';
import { ERROR_RESPONSE } from '../consts';
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

    res.status(200).send(`PaymentIntent status: ${paymentIntent.status}`);
  } catch (e) {
    console.error(e);
    res.status(500).json(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
