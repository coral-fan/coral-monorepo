import Stripe from 'stripe';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';

if (!process.env.STRIPE_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('STRIPE_SECRET_KEY'));
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

export const getStripe = () => stripe;
