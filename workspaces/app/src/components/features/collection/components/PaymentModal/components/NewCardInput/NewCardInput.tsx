import styled from '@emotion/styled';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent, StripeError } from '@stripe/stripe-js';
import { Toggle } from 'components/ui';
import { useUpsertUser, useUserUid } from 'libraries/models';
import { FormEvent, useCallback, useState } from 'react';
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
import { ProcessingOverlay } from '../ProcessingOverlay';
import { SwitchPaymentMethod } from '../SwitchPaymentMethod';

interface NewCardInputProps {
  total: number;
  collectionId: string;
  handleSwitchPaymentClick: () => void;
}

const PaymentInfoContainer = styled(PaymentMethodContainer)`
  gap: 16px;
`;

export const NewCardInput = ({
  total,
  collectionId,
  handleSwitchPaymentClick,
}: NewCardInputProps) => {
  const elements = useElements();
  const stripe = useStripe();
  const upsertUser = useUpsertUser();
  const uid = useUserUid();

  const [error, setError] = useState<StripeError>();
  const [cardComplete, setCardComplete] = useState(false);
  const [shouldSavePaymentInfo, setShouldSavePaymentInfo] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnChange = useCallback(({ error, complete }: StripeCardElementChangeEvent) => {
    error ? setError(error) : setError(undefined);
    setCardComplete(complete);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
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

      const { paymentMethod } = await createPaymentMethod(cardElement, stripe);

      if (!paymentMethod) {
        console.log('No payment method found');
        return;
      }

      const { clientSecret, stripeCustomerId } = await createPaymentIntent({
        total,
        shouldSavePaymentInfo,
        paymentMethodId: paymentMethod.id,
        collectionId,
        uid,
      });

      //confirmCardPayment
      const { paymentIntent, error: confirmCardError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      // TODO: Remove console.log
      console.log(paymentIntent);

      if (paymentIntent?.status === 'succeeded' && shouldSavePaymentInfo) {
        await upsertUser(uid, {
          stripeCustomerId,
        });
      }

      if (confirmCardError) {
        setError(confirmCardError);
        setIsProcessing(false);
      }

      //TODO: Delete once PaymentModal listens to successful mint
      setIsProcessing(false);
    },
    [collectionId, elements, shouldSavePaymentInfo, stripe, total, uid, upsertUser]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <CheckoutContainer>
        {isProcessing && <ProcessingOverlay />}
        <PaymentInfoContainer>
          <CardElementContainer width={'100%'}>
            <CardElement options={cardElementOptions} onChange={handleOnChange} />
          </CardElementContainer>
          {error && <ErrorContainer>{error.message}</ErrorContainer>}
          <Toggle
            onChange={() => setShouldSavePaymentInfo((previousValue) => !previousValue)}
            checked={shouldSavePaymentInfo}
          >
            Save my payment info for later
          </Toggle>
        </PaymentInfoContainer>
        <SwitchPaymentMethod handleClick={handleSwitchPaymentClick} isAvax={false} />
        <PaymentButton disabled={!cardComplete || isProcessing} total={total} />
      </CheckoutContainer>
    </Form>
  );
};
