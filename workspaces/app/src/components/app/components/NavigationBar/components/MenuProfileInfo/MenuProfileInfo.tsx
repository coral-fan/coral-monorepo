import styled from '@emotion/styled';
import { Photo } from 'libraries/models';
import { ProfileInfo, ProfileInfoProps } from 'components/ui';
import { useWallet } from 'libraries/blockchain';

export interface MenuProfileProps extends Omit<ProfileInfoProps, 'secondaryInfo'> {
  profilePhoto: Photo;
}

const Wrapper = styled.div`
  padding: 16px 20px 16px 0px;
`;

export const MenuProfileInfo = ({ username, profilePhoto }: Omit<MenuProfileProps, 'size'>) => {
  const { balance } = useWallet();
  const walletBalance = balance ? `${balance} AVAX` : `0 AVAX`;

  return (
    <Wrapper>
      <ProfileInfo profilePhoto={profilePhoto} username={username} secondaryInfo={walletBalance} />
    </Wrapper>
  );
};
