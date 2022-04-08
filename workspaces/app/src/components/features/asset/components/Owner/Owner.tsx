import styled from '@emotion/styled';
import { Card as BaseCard, Link, ProfileInfo } from 'components/ui';
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

interface OwnerProps extends Pick<User, 'username' | 'profilePhoto' | 'type'> {
  userId: User['id'];
  assetId: Asset['id'];
}

const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const getUserType = (type: UserType) => type.split('_').map(capitalize).join(' ');

const AssetId = styled.span`
  font-size: ${tokens.font.size.lg};
`;

export const Owner = ({ userId, assetId, username, profilePhoto, type }: OwnerProps) => (
  <Link href={`/user/${userId}`}>
    <Card variant="secondary">
      <ProfileInfo {...{ username, profilePhoto, secondaryInfo: getUserType(type) }} />
      <AssetId>#{assetId}</AssetId>
    </Card>
  </Link>
);
