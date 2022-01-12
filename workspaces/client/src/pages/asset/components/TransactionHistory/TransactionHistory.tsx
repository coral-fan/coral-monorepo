import styled from '@emotion/styled';
import { Item, ItemProps } from './Item';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { Heading } from 'components/ui';

const PLACEHOLDER_TEXT = 'No transactions yet';

export interface TransactionsProp {
  transactions?: ItemProps[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  font-style: italic;
  color: ${tokens.color.gray};
  padding: 12px 4px;
`;

export const TransactionHistory = ({ transactions }: TransactionsProp) => {
  const showTransactions = transactions && transactions.length > 0;

  return (
    <Container>
      <Heading level={2}>Transaction history</Heading>
      {showTransactions ? (
        <Transactions>
          {transactions?.map((transaction, i) => (
            <Item key={i} {...transaction} />
          ))}
        </Transactions>
      ) : (
        <Placeholder>{PLACEHOLDER_TEXT}</Placeholder>
      )}
    </Container>
  );
};
