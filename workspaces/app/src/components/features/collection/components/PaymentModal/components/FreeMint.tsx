import { JsonRpcProvider } from '@ethersproject/providers';
import { Button } from 'components/ui';
import { AVALANCHE } from 'consts';
import { useUserUid } from 'libraries/models';
import { getCoralAPIAxios } from 'libraries/utils';
import { useErrorToast } from 'libraries/utils/toasts';
import { useCallback } from 'react';
import { useTaylaParxAllAccessPassId } from '../../../../../../../pages/artist/tayla-parx/hooks';

interface FreeMintProps {
  collectionId: string;
  setIsMintingNFT: (isMinting: boolean) => void;
  setAssetId: (assetId: number) => void;
}

const axios = getCoralAPIAxios();

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const FreeMint = ({ collectionId, setIsMintingNFT, setAssetId }: FreeMintProps) => {
  const userId = useUserUid();
  const errorToast = useErrorToast();

  const handleFreeMint = useCallback(() => {
    if (userId !== undefined) {
      setIsMintingNFT(true);
      axios
        .post<{ transactionHash: string }>('nft/mint-for-free', {
          collectionId,
        })
        .then(async ({ data: { transactionHash } }) => {
          const transactionReceipt = await avalancheRpcProvider.waitForTransaction(transactionHash);
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
  }, [setIsMintingNFT, collectionId, userId, setAssetId, errorToast]);

  const taylaParxAllAccessPassId = useTaylaParxAllAccessPassId();

  return (
    <Button onClick={handleFreeMint}>
      {collectionId === taylaParxAllAccessPassId || collectionId === taylaParxAllAccessPassId
        ? 'Claim Free Pass'
        : 'Mint Free NFT'}
    </Button>
  );
};
