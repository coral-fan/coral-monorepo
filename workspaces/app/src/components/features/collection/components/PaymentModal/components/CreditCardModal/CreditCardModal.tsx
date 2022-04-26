import styled from '@emotion/styled';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Modal, Toggle } from 'components/ui';
import { Collection } from 'libraries/models';
import { FormEvent, useState } from 'react';
import tokens from 'styles/tokens';

interface CreditCardModalProps {
  price: number;
  collectionId: Collection['id'];
  closeModal: () => void;
  onSuccessfulPayment: () => void;
}

const CardElementContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border: solid 1px ${tokens.border.color.brand};
  border-radius: ${tokens.border.radius.sm};

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.md};
  align-items: center;
`;

const cardElementOptions = {
  style: {
    base: {
      fontSize: '12px',
      color: '#F0F0F0',
      '::placeholder': {
        color: '#F0F0F0',
      },
    },
    invalid: {
      color: '#E13214',
    },
  },
};

export const CreditCardModal = ({
  price,
  collectionId,
  closeModal,
  onSuccessfulPayment,
}: CreditCardModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [checkoutError, setCheckoutError] = useState();

  const elements = useElements();
  const stripe = useStripe();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('No stripe or elements');
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { data: clientSecret } = await axios.post('/api/payment_intent', {
      amount: price * 100,
      collectionId,
    });

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log('No card element');
      return;
    }

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq?.paymentMethod?.id,
    });
    console.log(confirmedCardPayment);
    setIsProcessing(false);
    onSuccessfulPayment();
  };

  return (
    <Modal title="Pay with Credit Card" onClick={closeModal} fullHeight={true}>
      <form onSubmit={handleFormSubmit}>
        <ContentContainer>
          <CardElementContainer>
            <CardElement options={cardElementOptions} />
          </CardElementContainer>
          <Toggle onChange={() => setSavePaymentInfo(!savePaymentInfo)} checked={savePaymentInfo}>
            Save my payment info for later
          </Toggle>
          <Button disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Pay $${price}`}
          </Button>
        </ContentContainer>
      </form>
    </Modal>
  );
};
