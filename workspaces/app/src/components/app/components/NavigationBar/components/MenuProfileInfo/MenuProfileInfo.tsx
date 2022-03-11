import styled from '@emotion/styled';
import { Photo } from 'libraries/models';
import { ProfileInfo, ProfileInfoProps } from 'components/ui';

export interface MenuProfileProps extends Omit<ProfileInfoProps, 'secondaryInfo'> {
  walletBalance: number;
  profilePhoto: Photo;
}

const Wrapper = styled.div`
  padding: 16px 0;
`;

export const MenuProfileInfo = ({
  username,
  profilePhoto,
  walletBalance,
}: Omit<MenuProfileProps, 'size'>) => (
  <Wrapper>
    <ProfileInfo
      profilePhoto={profilePhoto}
      username={username}
      secondaryInfo={`${walletBalance} AVAX`}
    />
  </Wrapper>
);
