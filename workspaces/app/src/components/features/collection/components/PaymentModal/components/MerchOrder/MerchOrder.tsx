import styled from '@emotion/styled';
import { Button, Heading } from 'components/ui';
import { SizeOption, ColorOption, MerchOptionTypes, useShippingInfoId } from 'libraries/models';
import { useCallback, useEffect, useState } from 'react';
import tokens from 'styles/tokens';
import { ConfirmShippingInfo, MerchOptionSelect, ShippingInfoModal } from './components';

interface MerchOrderProps {
  merchOptionTypes: MerchOptionTypes | null;
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
  const [showConfirmShippingInfo, setShowConfirmShippingInfo] = useState(
    () => merchOptionTypes && merchOptionTypes.length === 0
  );

  // Shipping info Id means user has saved a shipping address
  const shippingInfoId = useShippingInfoId();

  const handleNextClick = useCallback(async () => {
    if (isOptionsSelected) {
      setShowConfirmShippingInfo(true);
    }
  }, [isOptionsSelected]);

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
    setIsOptionsSelected(() =>
      merchOptionTypes ? Object.keys(options).length === merchOptionTypes.length : true
    );
  }, [options, merchOptionTypes]);

  /*
  Possible States

  1. No merch options + no shipping info
    > Buy Now -> Shipping Info -> Confirm / Existing -> Mint
    > !merchOptionTypes  && !shippingInfoId

  2. Merch options + shippingInfo
    > Buy Now -> Merch Options -> Confirm / Existing -> Mint
    > merchOptionsTypes && shippingInfoId
   
  3. No Merch options + shippingInfo
    > Buy Now -> Confirm / Existing -> Mint
    > !merchOptionTypes && shippingInfoId
   
  4. Merch Options + no shipping info
    > Buy Now -> Merch Options -> Confirm / Existing -> Mint
    > merchOptionTypes && !shippingInfo
  */

  return (
    <Container>
      <Heading level={2} styleVariant={'h3'}>
        {merchOptionTypes && !isOptionsSelected ? 'Options' : 'Confirm Shipping Info'}
      </Heading>
      {merchOptionTypes && !showConfirmShippingInfo && (
        <SelectContainer>
          {merchOptionTypes.map((type) => (
            <MerchOptionSelect key={type} type={type} onChange={handleOnChange} />
          ))}
        </SelectContainer>
      )}
      {showConfirmShippingInfo && (
        <ConfirmShippingInfo
          shippingInfoId={shippingInfoId}
          addOrUpdateAddress={() => setShowShippingInfoForm(true)}
        />
      )}

      {showShippingInfoForm && <ShippingInfoModal onClose={() => setShowShippingInfoForm(false)} />}

      <Button
        onClick={!showConfirmShippingInfo ? handleNextClick : handleCreateMerchOrder}
        loading={isHandlingCreateMerchOrder}
        disabled={isHandlingCreateMerchOrder || !isOptionsSelected || !shippingInfoId}
      >
        Next
      </Button>
    </Container>
  );
};
