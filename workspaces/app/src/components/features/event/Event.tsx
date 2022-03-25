import { GetServerSideProps } from 'next';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { interval, map, mergeMapTo, skipUntil, timer } from 'rxjs';

import { useIsAuthenticated } from 'libraries/authentication';
import { getWalletNfts$ } from 'libraries/blockchain/wallet/observables';
import { useWallet } from 'libraries/blockchain';
import {
  WebPlayer,
  PrivateEventModal,
  AccessGrantedModal,
  LoginButton,
  BuyTicketButton,
  CheckingNftModal,
} from './components';

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

  const { address } = useWallet();

  useEffect(() => {
    if (isAuthenticated && address) {
      const walletNftsMap$ = getWalletNfts$(address);

      const doesUserHaveAccess$ = interval(2500).pipe(
        skipUntil(walletNftsMap$),
        mergeMapTo(walletNftsMap$),
        map((nftsMap) => allowedNftCollections.some((address) => nftsMap[address] !== undefined))
      );

      doesUserHaveAccess$.subscribe((doesHaveAccess) => {
        setDoesUserHaveAccess(doesHaveAccess);
        setIsCheckingWallet(false);
      });

      doesUserHaveAccess$
        .pipe(mergeMapTo(timer(2500)))
        .subscribe(() => setIsAccessGrantedModal(false));
    }
  }, [isAuthenticated, address]);

  if (!isAuthenticated) {
    return (
      <PrivateEventModal
        message="Please log in so we can check your wallet."
        actionElement={<LoginButton />}
      />
    );
  }

  if (isCheckingWallet) {
    return <CheckingNftModal />;
  }

  if (!doesUserHaveAccess) {
    return (
      <PrivateEventModal
        message="This event is for members and ticket holders only. Buy a ticket now for this special  and exclusive perks."
        actionElement={<BuyTicketButton collectionId="1" />}
      />
    );
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
