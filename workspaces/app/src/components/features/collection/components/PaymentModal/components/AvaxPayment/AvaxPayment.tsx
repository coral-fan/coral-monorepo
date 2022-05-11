import styled from '@emotion/styled';
import { Button } from 'components/ui';
import { Spinner } from 'components/ui/Spinner/Spinner';
import { getAvaxFormat, useWallet } from 'libraries/blockchain';
import { useEffect, useState } from 'react';
import tokens from 'styles/tokens';
import { CheckoutContainer, PaymentMethodContainer } from '../components';
import { Currency } from '../Currency';
import { SwitchPaymentMethod } from '../SwitchPaymentMethod';

const WalletBalanceContainer = styled(PaymentMethodContainer)`
  justify-content: end;
  align-items: center;
`;

const Heading = styled.span`
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  line-height: ${tokens.font.line_height.xs};
  text-transform: uppercase;
`;
const WalletBalance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
`;

const InsufficientFunds = styled.span`
  text-align: center;
  font-size: ${tokens.font.size.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  line-height: ${tokens.font.line_height.sm};
  color: ${tokens.font.color.error};
`;

interface AvaxPaymentProps {
  total: number;
  handleSwitchPaymentClick: () => void;
}
export const AvaxPayment = ({ total, handleSwitchPaymentClick }: AvaxPaymentProps) => {
  const [sufficientFunds, setSufficientFunds] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { balance } = useWallet();

  useEffect(() => {
    if (balance) {
      setSufficientFunds(balance >= total);
      setIsLoading(false);
    }
  }, [balance, total]);

  const formattedBalance = balance ? getAvaxFormat(balance) : '0';

  const handleButtonClick = async () => {
    console.log(`Buy NFT for ${total} AVAX`);
  };

  return (
    <CheckoutContainer>
      <WalletBalanceContainer>
        {isLoading ? (
          <Spinner color={tokens.border.color.brand} size={'60px'} />
        ) : (
          <WalletBalance>
            <Heading>Wallet Balance</Heading>
            <Currency value={formattedBalance} isAvax={true} />
            {!sufficientFunds && (
              <InsufficientFunds>Insufficient funds in wallet</InsufficientFunds>
            )}
          </WalletBalance>
        )}
      </WalletBalanceContainer>
      <SwitchPaymentMethod handleClick={handleSwitchPaymentClick} isAvax={true} />
      <Button disabled={!sufficientFunds} onClick={handleButtonClick}>
        Mint
      </Button>
    </CheckoutContainer>
  );
};
