import styled from '@emotion/styled';
import { Card as BaseCard, ProfileInfo } from 'components/ui';
import { Asset, User, UserType } from 'libraries/models';
import tokens from 'styles/tokens';

const Card = styled(BaseCard)`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface OwnerProps extends Pick<User, 'username' | 'profilePhoto' | 'type'> {
  assetId: Asset['id'];
}

const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const getUserType = (type: UserType) => type.split('_').map(capitalize).join(' ');

const AssetId = styled.span`
  font-size: ${tokens.font.size.lg};
`;

export const Owner = ({ assetId, username, profilePhoto, type }: OwnerProps) => (
  <Card variant="secondary">
    <ProfileInfo {...{ username, profilePhoto, secondaryInfo: getUserType(type) }} />
    <AssetId>#{assetId}</AssetId>
  </Card>
);
