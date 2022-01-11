import styled from '@emotion/styled';
import { Transaction, TransactionProps } from '../Transaction';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

export interface TransactionsProp {
  transactions?: TransactionProps[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Heading = styled.h2`
  font-size: 18px;
  line-height: 23px;
  font-weight: 700;
`;

const Transactions = styled.div`
  height: 331px; // To Do: Adjust based on layout
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    height: 441px; // To Do: Adjust based on layout
  }
`;

const Placeholder = styled.div`
  border-top: solid 1px ${tokens.color.gray};
  font-style: italic;
  color: ${tokens.color.gray};
  padding: 12px 4px;
`;

export const TransactionHistory = ({ transactions }: TransactionsProp) => {
  const showTransactions = transactions && transactions.length > 0;
  console.log(showTransactions);
  return (
    <Container>
      <Heading>Transaction history</Heading>
      {showTransactions ? (
        <Transactions>
          {transactions?.map((transaction, i) => (
            <Transaction key={i} {...transaction} />
          ))}
        </Transactions>
      ) : (
        <Placeholder>No transactions yet</Placeholder>
      )}
    </Container>
  );
};
