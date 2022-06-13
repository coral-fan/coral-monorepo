import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';
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
  padding: 8px 0px;
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  border-top: var(--borderStyle);
  font-weight: ${tokens.font.weight.bold};

  &:last-of-type {
    border-bottom: var(--borderStyle);
  }

  @media ${QUERY.TABLET} {
    padding: 16px 0px;
  }
`;
const TransactionFeeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionFeeDetail = styled.span`
  color: ${tokens.font.color.secondary};
  text-transform: uppercase;
  font-size: ${tokens.font.size.xs};
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
          {transactionFeePercentage !== 0 && (
            <TransactionFeeDetail>{`${transactionFeePercentage}% of item price`}</TransactionFeeDetail>
          )}
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
