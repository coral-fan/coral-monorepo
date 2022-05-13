import styled from '@emotion/styled';
import { CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardCvcElementChangeEvent, StripeError } from '@stripe/stripe-js';
import axios from 'axios';
import { Toggle } from 'components/ui';
import { Spinner } from 'components/ui/Spinner/Spinner';
import { NullableString, useUserUid } from 'libraries/models';
import { FormEvent, useEffect, useState } from 'react';
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
import { SwitchPaymentMethod } from '../SwitchPaymentMethod';

interface CardPaymentProps {
  stripeCustomerId: NullableString;
  total: number;
  collectionId: string;
  handleSwitchPaymentClick: () => void;
  onSuccessfulPayment: () => void;
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
  onSuccessfulPayment,
}: CardPaymentProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodData>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<StripeError>();
  const [cardComplete, setCardComplete] = useState(false);
  const [authorization, setAuthorization] = useState(true);

  const elements = useElements();
  const stripe = useStripe();

  const uid = useUserUid();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post('/api/payment/get-card', {
        customer: stripeCustomerId,
      });
      setPaymentMethod(data);
      setIsLoading(false);
    };
    fetchData();
  }, [stripeCustomerId]);

  const CreditCardIcon =
    paymentMethod &&
    isValidCreditCardType(paymentMethod.brand) &&
    getCreditCardIcon(paymentMethod.brand);

  const handleOnChange = ({ error, complete }: StripeCardCvcElementChangeEvent) => {
    error ? setError(error) : setError(undefined);
    setCardComplete(complete);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);

    if (!stripe || !paymentMethod || !elements || !uid) {
      console.log('Stripe or payment method not found');
      return;
    }

    const cardCvcElement = elements.getElement(CardCvcElement);

    const { clientSecret } = await createPaymentIntent({
      amount: total,
      savePaymentInfo: true,
      stripeCustomerId,
      paymentMethodId: paymentMethod.id,
      collectionId,
      uid,
    });

    if (!cardCvcElement) {
      return;
    }

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

    console.log(paymentIntent);

    if (confirmCardError) {
      setError(confirmCardError);
      console.log(confirmCardError);
    }
    setIsProcessing(false);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <CheckoutContainer>
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
        <PaymentButton
          disabled={!cardComplete || !authorization}
          isProcessing={isProcessing}
          total={total}
        />
      </CheckoutContainer>
    </Form>
  );
};
