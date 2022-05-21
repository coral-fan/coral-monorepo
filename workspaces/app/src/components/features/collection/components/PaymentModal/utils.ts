import axios from 'axios';
import { Stripe, StripeCardElement } from '@stripe/stripe-js';
import { Collection, PrivateUserData } from 'libraries/models';
interface CreatePaymentIntentParameters {
  total: number;
  shouldSavePaymentInfo: boolean;
  paymentMethodId: string;
  collectionId: Collection['id'];
  stripeCustomerId: PrivateUserData['stripeCustomerId'];
  userId: string;
}

export const createPaymentIntent = async ({
  total,
  shouldSavePaymentInfo,
  stripeCustomerId,
  paymentMethodId,
  collectionId,
  userId,
}: CreatePaymentIntentParameters) => {
  const { data } = await axios.post<{
    clientSecret: string;
    stripeCustomerId: string | undefined;
  }>('/api/payment/pay', {
    amount: Math.ceil(total * 100),
    shouldSavePaymentInfo,
    paymentMethodId,
    stripeCustomerId,
    collectionId,
    userId,
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
