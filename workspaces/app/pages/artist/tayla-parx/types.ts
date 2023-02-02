import { ArtistData } from 'libraries/models';

export interface TaylaParxCampaignMetadata {
  ids: {
    allAccessPass: string;
    shareToEarnCampaign: {
      allAccessPass: string;
      musicVideoRich: string;
    };
    redeemPointsForReward: string;
  };
}

export interface TaylaParxData extends ArtistData<TaylaParxCampaignMetadata> {
  initialDoesUserHaveAccessPass: boolean;
}
