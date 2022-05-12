import { NullableString } from 'libraries/models';
import axios from 'axios';
import { Stripe, StripeCardElement } from '@stripe/stripe-js';

interface PaymentIntentProps {
  amount: number;
  savePaymentInfo: boolean;
  paymentMethodId: string;
  collectionId: string;
  stripeCustomerId?: NullableString;
  uid: string;
}

export const createPaymentIntent = async ({
  amount,
  savePaymentInfo,
  stripeCustomerId,
  paymentMethodId,
  collectionId,
  uid,
}: PaymentIntentProps) => {
  const {
    data: { clientSecret, customerId },
  } = await axios.post('/api/payment/pay', {
    amount: Math.ceil(amount * 100),
    savePaymentInfo,
    paymentMethodId,
    stripeCustomerId,
    collectionId,
    uid,
  });

  return { clientSecret, customerId };
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
