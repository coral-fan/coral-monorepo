import { object, string } from 'yup';
import { Handler } from '../types';
import { getHandler, getStripe } from '../utils';

const getCardAPISchema = object({
  stripeCustomerId: string().required(),
});

const stripe = getStripe();

const post: Handler = async (req, res) => {
  try {
    const { stripeCustomerId } = await getCardAPISchema.validate(req.body);
    const paymentMethods = await stripe.customers.listPaymentMethods(stripeCustomerId, {
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
    console.error(e);
    res.status(500).json({ statusCode: 500, message: e.message });
  }
};

export default getHandler({ post });
