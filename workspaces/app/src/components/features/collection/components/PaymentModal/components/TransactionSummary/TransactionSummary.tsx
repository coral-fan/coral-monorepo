import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { Currency } from '../Currency';

interface TransactionSummaryProps {
  isAvax: boolean;
  price: string;
  total: string;
  altTotal: string;
  transactionFee: string;
  transactionFeePercentage: number;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LineItem = styled.div`
  --borderStyle: solid 1px ${tokens.border.color.secondary};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 19px 0px;
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  border-top: var(--borderStyle);
  font-weight: ${tokens.font.weight.bold};

  &:last-of-type {
    border-bottom: var(--borderStyle);
  }
`;
const TransactionFeeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionFeeDetail = styled.span`
  color: ${tokens.font.color.secondary};
  text-transform: uppercase;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const TransactionSummary = ({
  isAvax,
  price,
  total,
  altTotal,
  transactionFee,
  transactionFeePercentage,
}: TransactionSummaryProps) => {
  return (
    <Container>
      <LineItem>
        <span>Item Price</span>
        <Currency value={price} isAvax={isAvax} />
      </LineItem>
      <LineItem>
        <TransactionFeeContainer>
          <span>Transaction Fee</span>
          <TransactionFeeDetail>{`${transactionFeePercentage}% of item price`}</TransactionFeeDetail>
        </TransactionFeeContainer>
        <Currency value={transactionFee} isAvax={isAvax} />
      </LineItem>
      <LineItem>
        <span>Total</span>
        <TotalPriceContainer>
          <Currency value={total} isAvax={isAvax} />
          <Currency value={altTotal} isAvax={!isAvax} isAlt={true} />
        </TotalPriceContainer>
      </LineItem>
    </Container>
  );
};
