import { CoralNftV1__factory } from '@coral/contracts/dist';
import styled from '@emotion/styled';
import { Button } from 'components/ui';
import { Spinner } from 'components/ui/Spinner/Spinner';
import { ethers } from 'ethers';
import { getAvaxFormat, useWallet } from 'libraries/blockchain';
import { useErrorToast } from 'libraries/utils/toasts';
import { useCallback, useEffect, useState } from 'react';
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
  collectionId: string;
  handleSwitchPaymentClick: () => void;
  setAssetId: (assetId: number) => void;
  setIsMintingNFT: (isMinting: boolean) => void;
  closePaymentModal: () => void;
}
export const AvaxPayment = ({
  total,
  collectionId,
  handleSwitchPaymentClick,
  setAssetId,
  setIsMintingNFT,
  closePaymentModal,
}: AvaxPaymentProps) => {
  const [sufficientFunds, setSufficientFunds] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [formattedBalance, setFormattedBalance] = useState<string>();
  const { provider, isActive, balance } = useWallet();

  useEffect(() => {
    if (balance !== undefined) {
      setFormattedBalance(getAvaxFormat(balance));
      setSufficientFunds(balance >= total);

      setIsLoading(false);
    }
  }, [balance, total]);

  const errorToast = useErrorToast();

  const handleButtonClick = useCallback(async () => {
    try {
      if (isActive && provider) {
        const signer = provider.getSigner();
        const nftContract = CoralNftV1__factory.connect(collectionId, signer);

        const txn = await nftContract.publicMint({
          value: ethers.utils.parseEther(total.toString()),
        });

        setIsMintingNFT(true);

        const txnReceipt = await txn.wait(1);
        const logs = txnReceipt.logs[0];
        const assetId = parseInt(logs.topics[3]);

        setAssetId(assetId);
        setIsMintingNFT(false);
      }
    } catch (e: any) {
      if (e.code === 4001) {
        errorToast('User rejected transaction');
        closePaymentModal();
      } else {
        errorToast();
        console.error(e);
      }
    }
  }, [
    isActive,
    total,
    provider,
    collectionId,
    setAssetId,
    setIsMintingNFT,
    errorToast,
    closePaymentModal,
  ]);

  return (
    <CheckoutContainer>
      <WalletBalanceContainer>
        {!isLoading && typeof formattedBalance === 'string' ? (
          <WalletBalance>
            <Heading>Wallet Balance</Heading>
            <Currency value={formattedBalance} isAvax={true} />
            {!sufficientFunds && (
              <InsufficientFunds>Insufficient funds in wallet</InsufficientFunds>
            )}
          </WalletBalance>
        ) : (
          <Spinner color={tokens.border.color.brand} size={'60px'} />
        )}
      </WalletBalanceContainer>
      <SwitchPaymentMethod
        handleClick={handleSwitchPaymentClick}
        isAvax={true}
        isWalletUser={isActive}
      />
      <Button disabled={!sufficientFunds} onClick={handleButtonClick}>
        Mint
      </Button>
    </CheckoutContainer>
  );
};
