import styled from '@emotion/styled';
import { Button, Heading } from 'components/ui';
import {
  SizeOption,
  ColorOption,
  MerchOptionTypes,
  useShippingInfoId,
  useUserUid,
} from 'libraries/models';
import { useCallback, useEffect, useState } from 'react';
import tokens from 'styles/tokens';
import { ConfirmShippingInfo, MerchOptionSelect, ShippingInfoModal } from './components';
import { getCoralAPIAxios } from 'libraries/utils';
interface MerchOrderProps {
  merchOptionTypes: MerchOptionTypes | null;
  setMerchOrderId: (merchOrderId: string) => void;
  collectionId: string;
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

interface MerchHeadingProps {
  content: string;
}
const MerchHeading = ({ content }: MerchHeadingProps) => (
  <Heading level={2} styleVariant={'h3'}>
    {content}
  </Heading>
);
export type MerchOption = SizeOption | ColorOption;

const axios = getCoralAPIAxios();

export const MerchOrder = ({
  merchOptionTypes,
  setMerchOrderId,
  collectionId,
}: MerchOrderProps) => {
  const [isHandlingCreateMerchOrder, setIsHandlingCreateMerchOrder] = useState(false);
  const [options, setOptions] = useState({});
  const [isOptionsSelected, setIsOptionsSelected] = useState(false);
  const [showShippingInfoForm, setShowShippingInfoForm] = useState(false);
  const [showConfirmShippingInfo, setShowConfirmShippingInfo] = useState(() =>
    merchOptionTypes && merchOptionTypes.length === 0 ? true : false
  );
  const [shippingInfoId, setShippingInfoId] = useState<string | null>(null);

  // Shipping info Id means user has saved a shipping address
  const userShippingInfoId = useShippingInfoId();

  const uid = useUserUid();

  useEffect(() => {
    if (userShippingInfoId) {
      setShippingInfoId(userShippingInfoId);
    }
  }, [userShippingInfoId]);

  const handleNextClick = useCallback(async () => {
    if (isOptionsSelected) {
      setShowConfirmShippingInfo(true);
    }
  }, [isOptionsSelected]);

  const handleCreateMerchOrder = useCallback(async () => {
    setIsHandlingCreateMerchOrder(true);

    const optionsArr = Object.entries(options);
    const merchOrderOptions = optionsArr.map((arr) => ({ type: arr[0], value: arr[1] }));

    try {
      const { data } = await axios.post('merch-order/create', {
        shippingInfoId,
        userId: uid,
        collectionId,
        options: merchOrderOptions,
      });

      const { id } = data;
      setMerchOrderId(id);
    } catch (e) {
      console.error(e);
    }
  }, [collectionId, shippingInfoId, options, uid, setMerchOrderId]);

  const handleOnChange = (type: string, value: string) => {
    setOptions((options) => ({ ...options, [type]: value }));
  };

  useEffect(() => {
    setIsOptionsSelected(() =>
      merchOptionTypes ? Object.keys(options).length === merchOptionTypes.length : true
    );
  }, [options, merchOptionTypes]);

  return (
    <Container>
      {merchOptionTypes && !showConfirmShippingInfo && (
        <>
          <MerchHeading content="Options" />
          <SelectContainer>
            {merchOptionTypes.map((type) => (
              <MerchOptionSelect key={type} type={type} onChange={handleOnChange} />
            ))}
          </SelectContainer>
        </>
      )}

      {showConfirmShippingInfo && (
        <>
          <MerchHeading content="Shipping Address" />
          <ConfirmShippingInfo
            shippingInfoId={shippingInfoId}
            addOrUpdateAddress={() => setShowShippingInfoForm(true)}
          />
        </>
      )}

      {showShippingInfoForm && (
        <ShippingInfoModal
          handleAddShippingInfo={setShippingInfoId}
          onClose={() => setShowShippingInfoForm(false)}
        />
      )}
      <Button
        onClick={!showConfirmShippingInfo ? handleNextClick : handleCreateMerchOrder}
        loading={isHandlingCreateMerchOrder}
        disabled={
          isHandlingCreateMerchOrder ||
          (merchOptionTypes && !isOptionsSelected) ||
          (showConfirmShippingInfo && !shippingInfoId)
        }
      >
        Next
      </Button>
    </Container>
  );
};
