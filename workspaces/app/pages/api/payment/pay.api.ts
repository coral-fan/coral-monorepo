import { TRANSACTION_FEE } from 'consts';
import { getDocumentData } from 'libraries/firebase';
import { Collection } from 'libraries/models';
import { boolean, number, object, string } from 'yup';
import { ERROR_RESPONSE } from '../consts';
import { Handler } from '../types';
import { getHandler, getPurchaseDocumentReference, getStripe } from '../utils';

const createPaymentIntentSchema = object({
  amount: number().required(),
  shouldSavePaymentInfo: boolean().required(),
  paymentMethodId: string().required(),
  collectionId: string().required(),
  stripeCustomerId: string().nullable(),
  userId: string().required(),
  purchaseId: string().required(),
});

const stripe = getStripe();

const post: Handler = async (req, res) => {
  let purchaseDocRef;

  try {
    const {
      amount,
      shouldSavePaymentInfo,
      stripeCustomerId,
      paymentMethodId,
      collectionId,
      userId,
      purchaseId,
    } = await createPaymentIntentSchema.validate(req.body);

    purchaseDocRef = await getPurchaseDocumentReference(purchaseId);

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
      metadata: { collectionId, userId, purchaseId },
    });

    await purchaseDocRef.set(
      { metadata: { stripePaymentIntentId: paymentIntent.id } },
      { merge: true }
    );

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

    purchaseDocRef?.set({ status: 'rejected' }, { merge: true });

    res.status(500).send(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
