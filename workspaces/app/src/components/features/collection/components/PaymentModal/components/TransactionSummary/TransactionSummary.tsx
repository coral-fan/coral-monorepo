import styled from '@emotion/styled';
import { ConditionalSpinner } from 'components/ui/Spinner';
import tokens from 'styles/tokens';
import { AvaxIcon as AvaxIconComponent, AvaxAltIcon as AvaxAltIconComponent } from '../icons';

interface TransactionSummaryProps {
  isAvax: boolean;
  price: string;
  total: string;
  altTotal: string;
  transactionFee: string;
  transactionFeePercentage: number;
  isLoading: boolean;
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

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: ${tokens.font.size.lg};
  line-height: ${tokens.font.line_height.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
`;

const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const AltPrice = styled.div`
  display: flex;
  gap: 6px;
  color: ${tokens.font.color.secondary};
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
`;

export const TransactionSummary = ({
  isAvax,
  price,
  total,
  altTotal,
  transactionFee,
  transactionFeePercentage,
  isLoading,
}: TransactionSummaryProps) => {
  const AvaxIcon = <AvaxIconComponent size={14} />;
  const AvaxAltIcon = <AvaxAltIconComponent />;

  return (
    <Container>
      <ConditionalSpinner size={'100px'} color={tokens.background.color.brand} loading={isLoading}>
        <LineItem>
          <span>Item Price</span>
          <Price>
            {isAvax && AvaxIcon}
            {price}
          </Price>
        </LineItem>
        <LineItem>
          <TransactionFeeContainer>
            <span>Transaction Fee</span>
            <TransactionFeeDetail>{`${transactionFeePercentage}% of item price`}</TransactionFeeDetail>
          </TransactionFeeContainer>
          <Price>
            {isAvax && AvaxIcon}
            {transactionFee}
          </Price>
        </LineItem>
        <LineItem>
          <span>Total</span>
          <Price>
            {isAvax && AvaxIcon}
            <TotalPriceContainer>
              {total}
              <AltPrice>
                {!isAvax && AvaxAltIcon}
                {altTotal}
              </AltPrice>
            </TotalPriceContainer>
          </Price>
        </LineItem>
      </ConditionalSpinner>
    </Container>
  );
};
