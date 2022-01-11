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

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    height: 441px; // To Do: Adjust based on layout
  }
`;

// Handle Scrollbar using a subContainer
// To Do: 34px is generic scrollbar width but varies across browsers
const TransactionsSubContainer = styled.div`
  border-top: solid 1px ${tokens.color.gray};
  width: calc(100% - 34px);
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
          <TransactionsSubContainer>
            {transactions?.map((transaction, i) => (
              <Transaction key={i} {...transaction} />
            ))}
          </TransactionsSubContainer>
        </Transactions>
      ) : (
        <Placeholder>No transactions yet</Placeholder>
      )}
    </Container>
  );
};
