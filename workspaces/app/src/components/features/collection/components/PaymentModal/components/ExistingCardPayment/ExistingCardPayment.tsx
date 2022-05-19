import styled from '@emotion/styled';
import { CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardCvcElementChangeEvent, StripeError } from '@stripe/stripe-js';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { Toggle, Spinner } from 'components/ui';
import { useUserUid } from 'libraries/models';
import tokens from 'styles/tokens';
import { cardElementOptions } from '../../styles';
import { createPaymentIntent } from '../../utils';
import {
  CardElementContainer,
  CheckoutContainer,
  ErrorContainer,
  Form,
  PaymentMethodContainer,
} from '../components';
import { getCreditCardIcon, isValidCreditCardType } from '../icons/CreditCardIcon';
import { PaymentButton } from '../PaymentButton';
import { ProcessingOverlay } from '../ProcessingOverlay';
import { SwitchPaymentMethod } from '../SwitchPaymentMethod';

interface CardPaymentProps {
  stripeCustomerId: string;
  total: number;
  collectionId: string;
  handleSwitchPaymentClick: () => void;
}

interface PaymentMethodData {
  id: string;
  brand: string;
  last4: string;
}

const Container = styled(PaymentMethodContainer)`
  width: 100%;
  gap: 16px;
`;

const CardInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${tokens.font.size.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  line-height: ${tokens.font.line_height.sm};
  gap: 16px;
`;

export const ExistingCardPayment = ({
  stripeCustomerId,
  total,
  collectionId,
  handleSwitchPaymentClick,
}: CardPaymentProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodData>();
  const [error, setError] = useState<StripeError>();
  const [cardComplete, setCardComplete] = useState(false);
  const [authorization, setAuthorization] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const elements = useElements();
  const stripe = useStripe();

  const uid = useUserUid();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post('/api/payment/get-card', {
        customer: stripeCustomerId,
      });
      setPaymentMethod(data);
    };
    fetchData();
  }, [stripeCustomerId]);

  const CreditCardIcon =
    paymentMethod &&
    isValidCreditCardType(paymentMethod.brand) &&
    getCreditCardIcon(paymentMethod.brand);

  const handleOnChange = useCallback(({ error, complete }: StripeCardCvcElementChangeEvent) => {
    error ? setError(error) : setError(undefined);
    setCardComplete(complete);
  }, []);

  const handleFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsProcessing(true);

      try {
        if (!stripe || !paymentMethod || !elements || !uid) {
          throw 'Stripe, paymentMethod, elements or uid not found.';
        }

        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardCvcElement) {
          throw 'Stripe card CVC element not found.';
        }

        const { clientSecret } = await createPaymentIntent({
          total,
          shouldSavePaymentInfo: false,
          stripeCustomerId,
          paymentMethodId: paymentMethod.id,
          collectionId,
          uid,
        });

        const { paymentIntent, error: confirmCardError } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: paymentMethod.id,
            payment_method_options: {
              card: {
                cvc: cardCvcElement,
              },
            },
          }
        );

        // TODO: Remove console.log
        console.log(paymentIntent);

        if (confirmCardError) {
          setError(confirmCardError);
        }

        //TODO: Delete once PaymentModal listens to successful mint
        setIsProcessing(false);
      } catch (e) {
        console.error(e);
      }
    },
    [collectionId, elements, paymentMethod, stripe, stripeCustomerId, total, uid]
  );

  return (
    <Form onSubmit={handleFormSubmit}>
      <CheckoutContainer>
        {isProcessing && <ProcessingOverlay />}
        <Container>
          <CardInfoContainer>
            {CreditCardIcon ? (
              <CardContainer>
                <CreditCardIcon /> *{paymentMethod?.last4}
              </CardContainer>
            ) : (
              <Spinner />
            )}
            <CardElementContainer width={'90px'}>
              <CardCvcElement options={cardElementOptions} onChange={handleOnChange} />
            </CardElementContainer>
          </CardInfoContainer>
          {error && <ErrorContainer>{error.message}</ErrorContainer>}
          <Toggle onChange={() => setAuthorization(!authorization)} checked={authorization}>
            I authorize Coral to charge my card on file.
          </Toggle>
        </Container>
        <SwitchPaymentMethod handleClick={handleSwitchPaymentClick} isAvax={false} />
        <PaymentButton disabled={!cardComplete || !authorization || isProcessing} total={total} />
      </CheckoutContainer>
    </Form>
  );
};
