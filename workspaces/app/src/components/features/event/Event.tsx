import styled from '@emotion/styled';

import { useIsAuthenticated } from 'libraries/authentication';
import { getWalletNfts$ } from 'libraries/blockchain/wallet/observables';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { interval, mergeMapTo, skipUntil, timer } from 'rxjs';
import { WebPlayer, PrivateEventModal, AccessGrantedModal } from './components';
import { CheckingNftModal } from './components/CheckingNFtModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface EventPageProps {
  mediaId: string;
}

const allowedNftCollections = ['0x71a517b09a62e3ddbdfab02d13bf237ad602f21b'];

export const EventPage = ({ mediaId }: EventPageProps) => {
  const isAuthenticated = useIsAuthenticated();

  const [doesUserHaveAccess, setDoesUserHaveAccess] = useState(false);
  const [isCheckingWallet, setIsCheckingWallet] = useState(true);

  const [showIsAccessGrantedModal, setIsAccessGrantedModal] = useState(true);

  useEffect(() => {
    const walletNftsMap$ = getWalletNfts$('0xd9C03cE871ed2EBd809f7c86Ff22ec62a7b02644');

    const checkNftMap$ = interval(2500).pipe(skipUntil(walletNftsMap$), mergeMapTo(walletNftsMap$));

    checkNftMap$.subscribe((nftsMap) => {
      setDoesUserHaveAccess(
        allowedNftCollections.some((address) => nftsMap[address] !== undefined)
      );
      setIsCheckingWallet(false);
    });

    checkNftMap$.pipe(mergeMapTo(timer(2500))).subscribe(() => setIsAccessGrantedModal(false));
  }, []);

  if (isCheckingWallet) {
    return <CheckingNftModal />;
  }

  if (!isAuthenticated || !doesUserHaveAccess) {
    return <PrivateEventModal collectionId={'1'} />;
  }

  return (
    <>
      {showIsAccessGrantedModal && <AccessGrantedModal />}
      <Container>
        <WebPlayer mediaId={mediaId} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<EventPageProps, { eventId: string }> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { eventId } = params;

  // For SproutVideo, mediaId is available after creating a new live stream
  const mediaId = 'd39eddb21f19e4c65a/095e73334ab41c6b';

  return {
    props: {
      mediaId,
    },
  };
};
