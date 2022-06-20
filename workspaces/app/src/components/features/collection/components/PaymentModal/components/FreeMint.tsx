import { JsonRpcProvider } from '@ethersproject/providers';
import { Button } from 'components/ui';
import { AVALANCHE } from 'consts';
import { useUserUid } from 'libraries/models';
import { getCoralAPIAxios, useRefetchPageData } from 'libraries/utils';
import { useErrorToast } from 'libraries/utils/toasts';
import { useRouter } from 'next/router';
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
  const refetchPageData = useRefetchPageData();
  const router = useRouter();

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
          await refetchPageData();
          const transactionReceipt = await avalancheRpcProvider.waitForTransaction(transactionHash);
          const logs = transactionReceipt.logs[0];
          const assetId = parseInt(logs.topics[3]);
          setAssetId(assetId);
          // below logic ensures after a successful redeem mint the URL updates & data is refetched to update the collection page so the redeem code is null
          delete router.query['redeem_code'];
          router.replace({ pathname: router.pathname, query: router.query }, undefined, {
            shallow: true,
          });
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
    errorToast,
  ]);

  return <Button onClick={handleRedeemNFT}>Mint Free NFT</Button>;
};
