import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { TaylaParxMetadata } from '../../pages/artist/tayla-parx/types';

const id = 'tayla-parx';

const metadata: TaylaParxMetadata = {
  id: {
    allAccessPass: '0x1eAf0DB4Bb72cE5596c729f839e554a4F806982a',
    shareToEarnCampaign: {
      allAccessPass: 'AZ5769qiksqsW8ZkMFhB',
      forWhatItsWorthOnSpotify: 'sYLWQCBSjlS7IQvn2iJC',
    },
    redeemPointsForReward: 'jMTrwJegcqqRN2irEffl',
  },
};

const addArtistMetadata = async () => {
  const artistDocRef = await getDocumentReferenceServerSide('artists', id);
  await artistDocRef.set(
    {
      metadata,
    },
    { merge: true }
  );
};

addArtistMetadata();
