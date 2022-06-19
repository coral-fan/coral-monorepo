import styled from '@emotion/styled';
import { Button } from 'components/ui';
import { MerchOptionTypes, MERCH_OPTIONS } from 'libraries/models';
import { useCallback, useState } from 'react';

interface MerchOrderProps {
  merchOptionTypes: NonNullable<MerchOptionTypes>;
  setMerchOrderId: (merchOrderId: string) => void;
}

const Container = styled.div`
  width: 100%;
`;

export const MerchOrder = ({ merchOptionTypes, setMerchOrderId }: MerchOrderProps) => {
  merchOptionTypes.forEach((type) => console.log(MERCH_OPTIONS[type]));

  const [isHandlingCreateMerchOrder, setIsHandlingCreateMerchOrder] = useState(false);

  const handleCreateMerchOrder = useCallback(async () => {
    setIsHandlingCreateMerchOrder(true);
    // CREATE MERCH ORDER HERE
  }, [setMerchOrderId]);

  return (
    <Container>
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
