import { Stripe, StripeCardElement } from '@stripe/stripe-js';
import { Collection, PrivateUserData, PurchaseData } from 'libraries/models';
import { getCoralAPIAxios } from 'libraries/utils';

const axios = getCoralAPIAxios();
interface CreatePaymentIntentParameters {
  total: number;
  shouldSavePaymentInfo: boolean;
  paymentMethodId: string;
  collectionId: Collection['id'];
  stripeCustomerId: PrivateUserData['stripeCustomerId'];
  userId: string;
  purchaseId: string;
  merchOrderId?: string;
}

export const createPaymentIntent = async ({
  total,
  shouldSavePaymentInfo,
  stripeCustomerId,
  paymentMethodId,
  collectionId,
  userId,
  purchaseId,
  merchOrderId,
}: CreatePaymentIntentParameters) => {
  const { data } = await axios.post<{
    clientSecret: string;
    stripeCustomerId: string | undefined;
  }>('payment/pay', {
    amount: Math.ceil(total * 100),
    shouldSavePaymentInfo,
    paymentMethodId,
    stripeCustomerId,
    collectionId,
    userId,
    purchaseId,
    merchOrderId,
  });

  return data;
};

export const createPaymentMethod = async (cardElement: StripeCardElement, stripe: Stripe) => {
  if (!stripe) {
    throw Error('Stripe not loaded');
  }

  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  return { paymentMethod, paymentMethodError: error };
};

interface CreatePurchaseParameters {
  userId: PurchaseData['userId'];
  collectionId: PurchaseData['collectionId'];
  metadata?: PurchaseData['metadata'];
}

export const createPurchase = async (createPurchaseParameters: CreatePurchaseParameters) => {
  const {
    data: { id },
  } = await axios.post<{ id: string }>('purchase', createPurchaseParameters);

  return id;
};
