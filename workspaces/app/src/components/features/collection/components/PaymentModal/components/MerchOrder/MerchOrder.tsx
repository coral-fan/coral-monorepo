import styled from '@emotion/styled';
import { Button, Heading } from 'components/ui';
import { SizeOption, ColorOption, MerchOptions, MerchOptionTypes } from 'libraries/models';
import { useCallback, useState } from 'react';
import tokens from 'styles/tokens';
import { MerchOptionSelect } from './components/MerchOptionSelect';

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

  const handleCreateMerchOrder = useCallback(async () => {
    setIsHandlingCreateMerchOrder(true);
    // CREATE MERCH ORDER HERE
  }, [setMerchOrderId]);

  const handleOnChange = (type: string, value: string) => {
    setOptions((options) => ({ ...options, [type]: value }));
  };

  return (
    <Container>
      <Heading level={2} styleVariant={'h3'}>
        Options
      </Heading>
      <SelectContainer>
        {merchOptionTypes.map((type) => (
          <MerchOptionSelect key={type} type={type} onChange={handleOnChange} />
        ))}
      </SelectContainer>
      <Button
        onClick={handleCreateMerchOrder}
        loading={isHandlingCreateMerchOrder}
        disabled={isHandlingCreateMerchOrder}
      >
        Next
      </Button>
    </Container>
  );
};
