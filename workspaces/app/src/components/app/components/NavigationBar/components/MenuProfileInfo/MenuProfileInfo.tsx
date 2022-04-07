import styled from '@emotion/styled';
import { Photo } from 'libraries/models';
import { ProfileInfo, ProfileInfoProps } from 'components/ui';
import { useProvider, useWallet } from 'libraries/blockchain';
import { getWalletBalance } from 'libraries/blockchain/wallet/utils';
import { useState } from 'react';

export interface MenuProfileProps extends Omit<ProfileInfoProps, 'secondaryInfo'> {
  profilePhoto: Photo;
}

const Wrapper = styled.div`
  padding: 16px 20px 16px 0px;
`;

export const MenuProfileInfo = ({ username, profilePhoto }: Omit<MenuProfileProps, 'size'>) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const provider = useProvider();
  const address = useWallet().address;

  getWalletBalance(address, provider).then((balance) => {
    if (balance) {
      setWalletBalance(balance);
    }
  });

  return (
    <Wrapper>
      <ProfileInfo
        profilePhoto={profilePhoto}
        username={username}
        secondaryInfo={`${walletBalance} AVAX`}
      />
    </Wrapper>
  );
};
