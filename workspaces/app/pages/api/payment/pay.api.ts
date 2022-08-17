import { CC_TRANSACTION_FEE } from 'consts';
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
  merchOrderId: string(),
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
      merchOrderId,
    } = await createPaymentIntentSchema.validate(req.body);

    purchaseDocRef = await getPurchaseDocumentReference(purchaseId);

    // Confirm price
    const collectionData = await getDocumentData<Collection>('collections', `${collectionId}`);

    if (!collectionData) {
      throw new Error(`Cannot find collection ${collectionId}`);
    }

    const { price } = collectionData;

    const totalTransactionAmount = Math.ceil(price * (1 + CC_TRANSACTION_FEE) * 100);

    if (amount !== totalTransactionAmount) {
      throw new Error(
        `Amount (${amount}) does not match calculated total (${totalTransactionAmount})`
      );
    }

    const customerId =
      stripeCustomerId ??
      (shouldSavePaymentInfo ? (await stripe.customers.create({ name: userId })).id : undefined);

    const requiredMetadata = { collectionId, userId, purchaseId };

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      setup_future_usage: 'on_session',
      payment_method_types: ['card'],
      capture_method: 'manual',
      payment_method: paymentMethodId,
      metadata: merchOrderId ? { ...requiredMetadata, merchOrderId } : requiredMetadata,
    });

    const baseMetadata = { stripePaymentIntentId: paymentIntent.id, merchOrderId };

    const purchaseDataSnapshot = await purchaseDocRef.get();

    const purchaseData = purchaseDataSnapshot.data();

    const metadata =
      purchaseData && purchaseData.metadata
        ? { ...purchaseData.metadata, ...baseMetadata }
        : baseMetadata;

    await purchaseDocRef.set({ metadata }, { merge: true });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      stripeCustomerId: customerId,
    });

    // TODO: Type error properly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must type error as any to check type property
  } catch (e: any) {
    console.error(e);
    purchaseDocRef?.set({ status: 'rejected' }, { merge: true });

    res.status(500).send(ERROR_RESPONSE);
  }
};

export default getHandler({ post });
