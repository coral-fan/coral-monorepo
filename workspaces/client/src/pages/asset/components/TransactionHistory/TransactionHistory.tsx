import styled from '@emotion/styled';
import { Fragment } from 'react';
import { Transaction, TransactionProps } from '../Transaction';
import tokens from 'styles/tokens';
import { DESKTOP_BREAKPOINT } from 'styles';

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
`;

const Transactions = styled.div`
  height: 342px; // To Do: Adjust based on layout
  overflow: scroll;
  border-top: solid 0.2px ${tokens.color.gray};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    height: 444px; // To Do: Adjust based on layout
  }
`;

export const TransactionHistory = ({ transactions }: TransactionsProp) => (
  <Container>
    <Heading>Transaction history</Heading>
    <Transactions>
      {transactions?.map((transaction, i) => (
        <Fragment key={i}>
          <Transaction {...transaction} />
        </Fragment>
      ))}
    </Transactions>
  </Container>
);
