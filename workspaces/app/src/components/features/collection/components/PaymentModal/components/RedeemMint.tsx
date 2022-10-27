import { JsonRpcProvider } from '@ethersproject/providers';
import { Button } from 'components/ui';
import { AVALANCHE } from 'consts';
import { useUserUid } from 'libraries/models';
import { getCoralAPIAxios, useRefetchPageData } from 'libraries/utils';
import { useCleanUrl } from 'libraries/utils/location';
import { useErrorToast } from 'libraries/utils/toasts';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface RedeemMintProps {
  redeemCode: string;
  collectionId: string;
  setIsMintingNFT: (isMinting: boolean) => void;
  setAssetId: (assetId: number) => void;
}

const axios = getCoralAPIAxios();

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const RedeemMint = ({
  redeemCode,
  collectionId,
  setIsMintingNFT,
  setAssetId,
}: RedeemMintProps) => {
  const userId = useUserUid();
  const errorToast = useErrorToast();
  const refetchPageData = useRefetchPageData();
  const router = useRouter();
  const cleanUrl = useCleanUrl();

  const handleRedeemNFT = useCallback(() => {
    if (userId !== undefined) {
      setIsMintingNFT(true);
      axios
        .post<{ transactionHash: string }>('nft/redeem', {
          code: redeemCode,
          collectionId,
          userId,
        })
        .then(async ({ data: { transactionHash } }) => {
          await refetchPageData();
          const transactionReceipt = await avalancheRpcProvider.waitForTransaction(transactionHash);
          const logs = transactionReceipt.logs[0];
          const assetId = parseInt(logs.topics[3]);
          setAssetId(assetId);
          // below logic ensures after a successful redeem mint the URL updates & data is refetched to update the collection page so the redeem code is null
          delete router.query['redeem_code'];
          cleanUrl();

          refetchPageData(router.asPath.split('?')[0]);
        })
        .catch((e) => {
          console.error(e);
          errorToast();
        })
        .finally(() => {
          setIsMintingNFT(false);
        });
    }
  }, [
    setIsMintingNFT,
    redeemCode,
    collectionId,
    userId,
    setAssetId,
    refetchPageData,
    router,
    cleanUrl,
    errorToast,
  ]);

  return <Button onClick={handleRedeemNFT}>Redeem Free NFT</Button>;
};
