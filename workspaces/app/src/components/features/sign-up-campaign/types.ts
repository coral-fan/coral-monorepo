import { User } from 'libraries/models';

export interface EarlySignUpCampaignData {
  userUids: User['id'][];
}
