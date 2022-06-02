import styled from '@emotion/styled';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent, StripeError } from '@stripe/stripe-js';
import { Toggle } from 'components/ui';
import { NullableString, useUpsertUser, useUserUid } from 'libraries/models';
import { FormEvent, useCallback, useState } from 'react';
import { cardElementOptions } from '../../styles';
import { createPaymentIntent, createPaymentMethod, createPurchase } from '../../utils';
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
  stripeCustomerId: NullableString;
  total: number;
  collectionId: string;
  handleSwitchPaymentClick: () => void;
  setPurchaseId: (id: string) => void;
}

const PaymentInfoContainer = styled(PaymentMethodContainer)`
  gap: 16px;
`;

export const NewCardInput = ({
  stripeCustomerId,
  total,
  collectionId,
  handleSwitchPaymentClick,
  setPurchaseId,
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

      try {
        if (!stripe || !elements || !uid) {
          throw 'Stripe, element or uid not found';
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          throw 'No card element found.';
        }

        const { paymentMethod } = await createPaymentMethod(cardElement, stripe);

        if (!paymentMethod) {
          throw 'No payment method found';
        }

        const purchaseId = await createPurchase({
          userId: uid,
          collectionId,
        });

        const response = await createPaymentIntent({
          total,
          shouldSavePaymentInfo,
          stripeCustomerId,
          paymentMethodId: paymentMethod.id,
          collectionId,
          userId: uid,
          purchaseId,
        });

        //confirmCardPayment
        const { paymentIntent, error: confirmCardError } = await stripe.confirmCardPayment(
          response.clientSecret,
          {
            payment_method: paymentMethod.id,
          }
        );

        if (paymentIntent?.status === 'requires_capture') {
          if (response.stripeCustomerId) {
            await upsertUser(uid, {
              stripeCustomerId: response.stripeCustomerId,
            });

            setPurchaseId(purchaseId);
          }
        }

        if (confirmCardError) {
          setError(confirmCardError);
        }
      } catch (e) {
        console.error(e);
      }

      setIsProcessing(false);
    },
    [
      collectionId,
      elements,
      shouldSavePaymentInfo,
      stripe,
      stripeCustomerId,
      total,
      uid,
      upsertUser,
      setPurchaseId,
    ]
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
