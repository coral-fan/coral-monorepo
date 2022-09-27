import { CoralNftV1__factory } from '@coral/contracts/dist';
import styled from '@emotion/styled';
import { Button } from 'components/ui';
import { Spinner } from 'components/ui/Spinner/Spinner';
import { ethers } from 'ethers';
import { getAvaxFormat, useWallet } from 'libraries/blockchain';
import { safeRoundUp } from 'libraries/utils/math';
import { useErrorToast } from 'libraries/utils/toasts';
import { useCallback, useEffect, useState } from 'react';
import tokens from 'styles/tokens';
import { CheckoutContainer, PaymentMethodContainer } from '../components';
import { Currency } from '../Currency';
import { SwitchPaymentMethod } from '../SwitchPaymentMethod';
import { getCoralAPIAxios } from 'libraries/utils';
import { createPurchase } from '../../utils';
import { useUserUid } from 'libraries/models';

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
  isMobile: boolean;
  merchOrderId?: string;
  fingerprint?: string;
}

const axios = getCoralAPIAxios();

export const AvaxPayment = ({
  total,
  collectionId,
  handleSwitchPaymentClick,
  setAssetId,
  setIsMintingNFT,
  isMobile,
  merchOrderId,
  fingerprint,
}: AvaxPaymentProps) => {
  const [sufficientFunds, setSufficientFunds] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [formattedBalance, setFormattedBalance] = useState<string>();
  const { provider, isActive, balance } = useWallet();
  const userId = useUserUid();

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

        const roundedTotal = safeRoundUp(total, 10);

        const txn = await nftContract.publicMint({
          value: ethers.utils.parseEther(roundedTotal.toString()),
        });

        setIsMintingNFT(true);

        if (!userId) {
          throw 'uid is undefined.';
        }

        await createPurchase({
          collectionId,
          userId,
          transactionHash: txn.hash,
          fingerprint,
        });

        const isMerchPurchase = merchOrderId !== undefined;

        if (isMerchPurchase) {
          await axios.post('merch-order/update-transaction-hash', {
            merchOrderId,
            transactionHash: txn.hash,
          });
        }

        const txnReceipt = await txn.wait(1);

        const isTxnSuccessful = txnReceipt?.status === 1;

        if (isMerchPurchase) {
          await axios.post('merch-order/update-status', {
            merchOrderId,
            status: isTxnSuccessful ? 'confirmed' : 'rejected',
          });
        }

        if (!isTxnSuccessful) {
          throw 'Transaction was not successful.';
        }

        const logs = txnReceipt.logs[0];
        const assetId = parseInt(logs.topics[3]);

        setAssetId(assetId);
      }
      // TODO: add type guard for e object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- need any for error handling
    } catch (e: any) {
      console.error(e);

      // This error comes from MetaMask
      if (e.code === 4001) {
        errorToast('User rejected transaction');
      } else {
        // These errors come from estimateGas call
        // TODO: Add any additional errors
        switch (e.reason) {
          case 'execution reverted: Not enough ether to purchase':
            errorToast('AVAX price out of sync - please try again');
          default:
            errorToast();
        }
      }
    } finally {
      setIsMintingNFT(false);
    }
  }, [
    isActive,
    total,
    provider,
    collectionId,
    userId,
    fingerprint,
    setAssetId,
    setIsMintingNFT,
    errorToast,
    merchOrderId,
  ]);

  return (
    <CheckoutContainer>
      <WalletBalanceContainer isMobile={isMobile}>
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
      <SwitchPaymentMethod handleClick={handleSwitchPaymentClick} isAvax={true} />
      <Button disabled={!sufficientFunds || !isActive} onClick={handleButtonClick}>
        Mint
      </Button>
    </CheckoutContainer>
  );
};
