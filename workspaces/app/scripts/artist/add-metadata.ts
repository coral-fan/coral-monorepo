import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { TaylaParxMetadata } from '../../pages/artist/tayla-parx/types';

const id = 'tayla-parx';

const metadata: TaylaParxMetadata = {
  id: {
    allAccessPass: '0x7918FBA5af536098e7d33700cfb5fCecB1B8a11B',
    shareToEarnCampaign: {
      allAccessPass: 'xqSPsvjg8w88feqYlCIc',
      musicVideoRich: 'xqSPsvjg8w88feqYlCIc',
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
