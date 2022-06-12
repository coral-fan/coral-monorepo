import { JsonRpcProvider } from '@ethersproject/providers';
import { Button } from 'components/ui';
import { AVALANCHE } from 'consts';
import { useUserUid } from 'libraries/models';
import { getCoralAPIAxios } from 'libraries/utils';
import { useErrorToast } from 'libraries/utils/toasts';
import { useCallback } from 'react';

interface FreeMintProps {
  redeemCode: string;
  collectionId: string;
  setIsMintingNFT: (isMinting: boolean) => void;
  setAssetId: (assetId: number) => void;
}

const axios = getCoralAPIAxios();

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const FreeMint = ({
  redeemCode,
  collectionId,
  setIsMintingNFT,
  setAssetId,
}: FreeMintProps) => {
  const userId = useUserUid();
  const errorToast = useErrorToast();

  const handleRedeemNFT = useCallback(() => {
    if (userId !== undefined) {
      setIsMintingNFT(true);
      axios
        .post<{ transactionHash: string }>('redeem-nft', {
          code: redeemCode,
          collectionId,
          userId,
        })
        .then(async ({ data: { transactionHash } }) => {
          console.log(transactionHash);
          const transactionReceipt = await avalancheRpcProvider.waitForTransaction(transactionHash);
          console.log(transactionReceipt);
          const logs = transactionReceipt.logs[0];
          const assetId = parseInt(logs.topics[3]);

          setAssetId(assetId);
        })
        .catch((e) => {
          console.error(e);
          errorToast();
        })
        .finally(() => {
          setIsMintingNFT(false);
        });
    }
  }, [setIsMintingNFT, redeemCode, collectionId, userId, setAssetId, errorToast]);

  return <Button onClick={handleRedeemNFT}>Mint Free NFT</Button>;
};
