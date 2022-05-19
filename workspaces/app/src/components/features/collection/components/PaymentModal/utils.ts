import { NullableString } from 'libraries/models';
import axios from 'axios';
import { Stripe, StripeCardElement } from '@stripe/stripe-js';

interface PaymentIntentFields {
  total: number;
  shouldSavePaymentInfo: boolean;
  paymentMethodId: string;
  collectionId: string;
  stripeCustomerId?: NullableString;
  uid: string;
}

export const createPaymentIntent = async ({
  total,
  shouldSavePaymentInfo,
  stripeCustomerId,
  paymentMethodId,
  collectionId,
  uid,
}: PaymentIntentFields) => {
  const { data } = await axios.post<{ clientSecret: string; stripeCustomerId: string }>(
    '/api/payment/pay',
    {
      amount: Math.ceil(total * 100),
      shouldSavePaymentInfo,
      paymentMethodId,
      stripeCustomerId,
      collectionId,
      uid,
    }
  );

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
