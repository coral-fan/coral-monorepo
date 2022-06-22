import styled from '@emotion/styled';
import { Button, Heading } from 'components/ui';
import { SizeOption, ColorOption, MerchOptionTypes, useShippingInfoId } from 'libraries/models';
import { useCallback, useEffect, useState } from 'react';
import tokens from 'styles/tokens';
import { ExistingShippingInfo } from './components/ExistingShippingInfo';
import { MerchOptionSelect } from './components/MerchOptionSelect';
import { ShippingInfoModal } from './components/ShippingInfoModal';

interface MerchOrderProps {
  merchOptionTypes: NonNullable<MerchOptionTypes>;
  setMerchOrderId: (merchOrderId: string) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: solid 1px ${tokens.border.color.secondary};
  padding-top: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export type MerchOption = SizeOption | ColorOption;

export const MerchOrder = ({ merchOptionTypes, setMerchOrderId }: MerchOrderProps) => {
  const [isHandlingCreateMerchOrder, setIsHandlingCreateMerchOrder] = useState(false);
  const [options, setOptions] = useState({});
  const [isOptionsSelected, setIsOptionsSelected] = useState(false);
  const [showShippingInfoForm, setShowShippingInfoForm] = useState(false);
  const [showExistingShippingInfo, setShowExistingShippingInfo] = useState(false);

  // Shipping info Id means user has saved a shipping address
  const shippingInfoId = '123';

  const handleNextClick = useCallback(async () => {
    if (isOptionsSelected) {
      if (shippingInfoId) {
        setShowExistingShippingInfo(true);
      } else {
        setShowShippingInfoForm(true);
      }
    }
  }, [isOptionsSelected, shippingInfoId]);

  const handleCreateMerchOrder = useCallback(async () => {
    setIsHandlingCreateMerchOrder(true);
    const optionsArr = Object.entries(options);
    const merchOrderOptions = optionsArr.map((arr) => ({ [arr[0]]: arr[1] }));
    // CREATE MERCH ORDER HERE
  }, [setMerchOrderId]);

  const handleOnChange = (type: string, value: string) => {
    setOptions((options) => ({ ...options, [type]: value }));
  };

  useEffect(() => {
    setIsOptionsSelected(() => Object.keys(options).length === merchOptionTypes.length);
  }, [options, merchOptionTypes]);

  return (
    <Container>
      <Heading level={2} styleVariant={'h3'}>
        {!showExistingShippingInfo ? 'Options' : 'Confirm Current Shipping Info'}
      </Heading>
      {!showExistingShippingInfo ? (
        <SelectContainer>
          {merchOptionTypes.map((type) => (
            <MerchOptionSelect key={type} type={type} onChange={handleOnChange} />
          ))}
        </SelectContainer>
      ) : (
        shippingInfoId && (
          <ExistingShippingInfo
            shippingInfoId={shippingInfoId}
            useDifferentAddressClick={() => setShowShippingInfoForm(true)}
          />
        )
      )}

      {showShippingInfoForm ? (
        <ShippingInfoModal onClose={() => setShowShippingInfoForm(false)} />
      ) : null}

      <Button
        onClick={!showShippingInfoForm ? handleNextClick : handleCreateMerchOrder}
        loading={isHandlingCreateMerchOrder}
        disabled={isHandlingCreateMerchOrder || !isOptionsSelected}
      >
        Next
      </Button>
    </Container>
  );
};
