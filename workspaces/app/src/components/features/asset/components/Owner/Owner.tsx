import styled from '@emotion/styled';
import { Card as BaseCard, Link, ProfileInfo } from 'components/ui';
import { AVALANCHE } from 'consts';
import { Asset, User, UserType } from 'libraries/models';
import tokens, { QUERY } from 'styles/tokens';

const Card = styled(BaseCard)`
  width: 100%;
  padding: 13px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media ${QUERY.TABLET} {
    padding: 20px;
  }
`;

export interface OwnerProps extends Pick<User, 'username' | 'profilePhoto' | 'type'> {
  userId: User['id'];
  assetId: Asset['id'];
}

const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const getUserType = (type: UserType) => type.split('_').map(capitalize).join(' ');

const AssetId = styled.span`
  font-size: ${tokens.font.size.lg};
`;

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
// implementation from https://github.com/gpxl-dev/truncate-eth-address/blob/main/src/index.ts
const truncateWalletAddress = (address: string) => {
  const match = address.match(truncateRegex);
  if (!match) {
    throw `address ${address} isn't a valid address.`;
  }
  return `${match[1]}…${match[2]}`;
};

export const Owner = ({ userId, assetId, username, profilePhoto, type }: OwnerProps) => (
  <Link
    href={
      userId === username ? `${AVALANCHE.BLOCK_EXPLORER_URL}/address/${userId}` : `/user/${userId}`
    }
  >
    <Card variant="secondary">
      <ProfileInfo
        username={userId === username ? truncateWalletAddress(userId) : username}
        profilePhoto={profilePhoto}
        secondaryInfo={getUserType(type)}
      />
      <AssetId>#{assetId}</AssetId>
    </Card>
  </Link>
);
