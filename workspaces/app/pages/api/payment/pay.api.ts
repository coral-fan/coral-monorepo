import { TRANSACTION_FEE } from 'consts';
import { getDocumentData } from 'libraries/firebase';
import { Collection } from 'libraries/models';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';
import Stripe from 'stripe';
import { boolean, number, object, string } from 'yup';
import { ERROR_RESPONSE } from '../consts';
import { Handler } from '../types';
import { getHandler } from '../utils';

if (!process.env.STRIPE_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_SECRET_KEY'));
}

const createPaymentIntentSchema = object({
  amount: number().required(),
  shouldSavePaymentInfo: boolean().required(),
  paymentMethodId: string().required(),
  collectionId: string().required(),
  stripeCustomerId: string().nullable(),
  userId: string().required(),
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

const post: Handler = async (req, res) => {
  try {
    const {
      amount,
      shouldSavePaymentInfo,
      stripeCustomerId,
      paymentMethodId,
      collectionId,
      userId,
    } = await createPaymentIntentSchema.validate(req.body);

    // Confirm price
    const collectionData = await getDocumentData<Collection>('collections', `${collectionId}`);

    if (!collectionData) {
      throw new Error(`Cannot find collection ${collectionId}`);
    }

    const { price } = collectionData;

    const totalTransactionAmount = Math.ceil(price * (1 + TRANSACTION_FEE) * 100);

    if (amount !== totalTransactionAmount) {
      throw new Error(
        `Amount (${amount}) does not match calculated total (${totalTransactionAmount})`
      );
    }

    const customerId =
      stripeCustomerId ??
      (shouldSavePaymentInfo ? (await stripe.customers.create({ name: userId })).id : undefined);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      setup_future_usage: 'on_session',
      payment_method_types: ['card'],
      capture_method: 'manual',
      payment_method: paymentMethodId,
      metadata: { collectionId: collectionId, userId },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      stripeCustomerId: customerId,
    });

    // TODO: Type error properly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must type error as any to check type property
  } catch (e: any) {
    switch (e.type) {
      case 'StripeCardError':
        console.error(`A payment error occurred: ${e.message}`);
        break;
      case 'StripeInvalidRequestError':
        console.error(`An invalid request occurred: ${e.message}`);
        break;
      default:
        console.error(`A problem occurred: ${e.message}.`);
        break;
    }
    res.status(500).send(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
