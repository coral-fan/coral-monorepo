import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { TaylaParxCampaignMetadata } from '../../pages/artist/tayla-parx/types';

const id = 'tayla-parx';

const metadata: TaylaParxCampaignMetadata = {
  ids: {
    allAccessPass: '0xcB846098C5f6a86D9775a183F80aFdF174eD1171',
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
