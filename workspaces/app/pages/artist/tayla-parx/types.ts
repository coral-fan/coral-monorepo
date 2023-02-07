import { ArtistData } from 'libraries/models';

export interface TaylaParxMetadata {
  id: {
    allAccessPass: string;
    shareToEarnCampaign: {
      allAccessPass: string;
      musicVideoRich: string;
    };
    redeemPointsForReward: string;
  };
}

export interface TaylaParxData extends ArtistData<TaylaParxMetadata> {
  initialDoesUserHaveAccessPass: boolean;
}
