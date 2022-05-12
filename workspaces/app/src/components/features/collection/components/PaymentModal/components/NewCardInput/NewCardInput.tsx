import styled from '@emotion/styled';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent, StripeError } from '@stripe/stripe-js';
import { Toggle } from 'components/ui';
import { useUpsertUser, useUserUid } from 'libraries/models';
import { FormEvent, useState } from 'react';
import { cardElementOptions } from '../../styles';
import { createPaymentIntent, createPaymentMethod } from '../../utils';
import {
  CardElementContainer,
  CheckoutContainer,
  ErrorContainer,
  Form,
  PaymentMethodContainer,
} from '../components';
import { PaymentButton } from '../PaymentButton';
import { SwitchPaymentMethod } from '../SwitchPaymentMethod';

interface NewCardInputProps {
  total: number;
  collectionId: string;
  handleSwitchPaymentClick: () => void;
  onSuccessfulPayment: () => void;
}

const PaymentInfoContainer = styled(PaymentMethodContainer)`
  gap: 16px;
`;

export const NewCardInput = ({
  total,
  collectionId,
  handleSwitchPaymentClick,
  onSuccessfulPayment,
}: NewCardInputProps) => {
  const elements = useElements();
  const stripe = useStripe();
  const upsertUser = useUpsertUser();
  const uid = useUserUid();

  const [error, setError] = useState<StripeError>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);

  const handleOnChange = ({ error, complete }: StripeCardElementChangeEvent) => {
    error ? setError(error) : setError(undefined);
    setCardComplete(complete);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);

    if (!stripe || !elements || !uid) {
      console.log('Stripe, element or uid not found');
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log('No card element found');
      return;
    }

    const { paymentMethod, paymentMethodError } = await createPaymentMethod(cardElement, stripe);

    if (!paymentMethod) {
      console.log('No payment method found');
      return;
    }

    const { clientSecret, customerId } = await createPaymentIntent({
      amount: total,
      savePaymentInfo: true,
      paymentMethodId: paymentMethod.id,
      collectionId,
      uid,
    });

    //confirmCardPayment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    // TODO: Move to server side
    if (paymentIntent?.status === 'succeeded' && savePaymentInfo) {
      upsertUser(uid, {
        stripeCustomerId: customerId,
      });
    }

    setIsProcessing(false);
    onSuccessfulPayment();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CheckoutContainer>
        <PaymentInfoContainer>
          <CardElementContainer width={'100%'}>
            <CardElement options={cardElementOptions} onChange={handleOnChange} />
          </CardElementContainer>
          {error && <ErrorContainer>{error.message}</ErrorContainer>}
          <Toggle onChange={() => setSavePaymentInfo(!savePaymentInfo)} checked={savePaymentInfo}>
            Save my payment info for later
          </Toggle>
        </PaymentInfoContainer>
        <SwitchPaymentMethod handleClick={handleSwitchPaymentClick} isAvax={false} />
        <PaymentButton disabled={!cardComplete} isProcessing={isProcessing} total={total} />
      </CheckoutContainer>
    </Form>
  );
};
