import styled from '@emotion/styled';
import { ProfilePhoto } from 'libraries/models';
import { BaseProfileInfo } from '../../BaseProfileInfo';
import { BaseProfileInfoProps } from '../../types';

export interface MenuProfileProps extends BaseProfileInfoProps {
  walletBalance: number;
  profilePhoto: ProfilePhoto;
}

const Wrapper = styled.div`
  padding: 16px 0;
`;

export const MenuProfileInfo = ({
  username,
  profilePhoto,
  walletBalance,
}: Omit<MenuProfileProps, 'size'>) => {
  return (
    <Wrapper>
      <BaseProfileInfo profilePhoto={profilePhoto} username={username}>
        {walletBalance} AVAX
      </BaseProfileInfo>
    </Wrapper>
  );
};
