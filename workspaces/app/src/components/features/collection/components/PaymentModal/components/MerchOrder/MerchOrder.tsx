import styled from '@emotion/styled';
import { Button, Heading } from 'components/ui';
import { MerchOptions, useShippingInfoId, useUserUid } from 'libraries/models';
import { useCallback, useEffect, useState } from 'react';
import tokens from 'styles/tokens';
import { ConfirmShippingInfo, MerchOptionSelect, ShippingInfoModal } from './components';
import { getCoralAPIAxios } from 'libraries/utils';

interface MerchOrderProps {
  merchOptionsData?: MerchOptions;
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

const axios = getCoralAPIAxios();

export const MerchOrder = ({
  merchOptionsData,
  setMerchOrderId,
  collectionId,
}: MerchOrderProps) => {
  // dummy data to muck around with
  // merchOptionsData = {
  //   type: 'color',
  //   values: ['Gold Plate Overlay', 'White Rhodium Overlay'],
  //   quantities: [103, 64],
  //   subOptions: [
  //     {
  //       type: 'size',
  //       values: ['7', '8', '9', '10', '11', '12'],
  //       quantities: [8, 14, 20, 32, 20, 9],
  //     },
  //     { type: 'size', values: ['7', '8', '9', '10', '11', '12'], quantities: [9, 9, 14, 14, 9, 9] },
  //   ],
  // };

  // merch
  const [merchOptions, setMerchOptions] = useState<[string, string[], MerchOptions[]?][]>(
    merchOptionsData
      ? [
          [
            merchOptionsData.type,
            merchOptionsData.values.filter((_, i) =>
              merchOptionsData?.quantities ? merchOptionsData.quantities[i] > 0 : true
            ),
            merchOptionsData.subOptions,
          ],
        ]
      : []
  );

  const [isHandlingCreateMerchOrder, setIsHandlingCreateMerchOrder] = useState(false);
  // options represents currently selected set of options by user
  // an object is used so that values can arbitarilybe overwritten
  const [options, setOptions] = useState<Record<string, string>>({});
  // isOptionsSelected represents whether user has selected all necessary options to proceed to providing a shipping address and payment method
  const [isOptionsSelected, setIsOptionsSelected] = useState(false);
  const [showShippingInfoForm, setShowShippingInfoForm] = useState(false);
  const [showConfirmShippingInfo, setShowConfirmShippingInfo] = useState(
    () => merchOptionsData === undefined
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

    const merchOrderOptions = Object.entries(options).map(([type, value]) => ({ type, value }));

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

  const handleOnChange = useCallback(
    (type: string, value: string) => {
      /* since merch options are nested, the order is maintained in the merchOptions array as a stack (first in, last out data structure)
         example:
          merchOptionsData = {
              type: 'color'
              ...
              subOptions: [
                {
                  type: 'size'
                },
                ...
              ]
            }
        
        merchOptions = [ ['color', [<color values>], ...], ['size', [<size values>], ...] ]
        ordering = color => size

        if most recently selected type is size, then keep the merch options array the same.
        result: [ ['color', [<color values>], ...], ['size',[<size values>], ...] ]
        if most recently selected type is color, then remove last element from merchOptions until current option type is color
        result: [ [type: 'color', values:[<color values>], ...] ]
      */
      while (merchOptions.length > 0 && merchOptions[merchOptions.length - 1][0] !== type) {
        delete options[merchOptions[merchOptions.length - 1][0]];
        merchOptions.pop();
      }

      const [, optionValues, subOptions] = merchOptions[merchOptions.length - 1];

      const valueIndex = optionValues.findIndex((option) => option === value);

      // when subOptions is undefined, this means all merch options are currently displayed, and there's no need to add additional options to the merchOptions array
      if (subOptions !== undefined) {
        const nextOption = subOptions[valueIndex];
        setMerchOptions((options) => [
          ...options,
          [
            nextOption.type,
            nextOption.values.filter((_, i) => nextOption.quantities[i] > 0),
            nextOption.subOptions,
          ],
        ]);
      } else {
        setIsOptionsSelected(true);
      }

      setOptions((options) => ({ ...options, [type]: value }));
    },
    [merchOptions, options]
  );

  return (
    <Container>
      {!showConfirmShippingInfo && (
        <>
          <MerchHeading content="Options" />
          <SelectContainer>
            {merchOptions.map(([type, values]) => (
              <MerchOptionSelect key={type} type={type} values={values} onChange={handleOnChange} />
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
          (merchOptions && !isOptionsSelected) ||
          (showConfirmShippingInfo && !shippingInfoId)
        }
      >
        Next
      </Button>
    </Container>
  );
};
