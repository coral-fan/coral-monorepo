import styled from '@emotion/styled';
import { SocialLinks } from 'components/ui/profile/Profile/components';
import { useIsAuthenticated } from 'libraries/authentication';
import { newBlock$ } from 'libraries/blockchain/observables';
import { getDoesOwnToken } from 'libraries/blockchain/utils';
import { ArtistData, getArtist, getUidServerSide, useUserUid } from 'libraries/models';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { distinctUntilChanged, switchMap } from 'rxjs';
import tokens, { QUERY } from 'styles/tokens';
import { ShareRichOnSpotify } from './components/ShareRichOnSpotify';
import { GetPaidForBeingAFan } from './components/GetPaidForBeingAFan';
import { ShareToEarn } from './components/ShareToEarn';
import { MusicVideoRich } from './components/MusicVideoRich';
import { Merch } from './components/Merch';

export const TAYLA_PARX_ALL_ACCESS_PASS_CONTRACT_ADDRESS =
  '0xcB846098C5f6a86D9775a183F80aFdF174eD1171';

interface TaylaParxPageProps extends ArtistData {
  initialDoesUserHaveAccessPass: boolean;
}

export const PageContainer = styled.div`
  --gap: 80px;

  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  @media ${QUERY.TABLET} {
    --gap: 150px;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  --gap: ${tokens.spacing.mobile.lg};

  @media ${QUERY.TABLET} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    --gap: ${tokens.spacing.desktop.lg};
  }
  gap: var(--gap);
`;

const ProfilePhotoWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Username = styled.h1`
  font-size: ${tokens.font.size.xl};
  letter-spacing: ${tokens.font.letter_spacing.xl};
  line-height: ${tokens.font.line_height.xl};
  font-weight: ${tokens.font.weight.bold};

  @media ${QUERY.TABLET} {
    font-size: ${tokens.font.size.xxl};
    letter-spacing: ${tokens.font.letter_spacing.xxl};
    line-height: ${tokens.font.line_height.xxl};
  }
`;

const InfoContainer = styled.div`
  --gap: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: auto;
  gap: var(--gap);

  @media ${QUERY.TABLET} {
    --gap: 40px;
  }

  align-items: flex-start;
`;

const BioSocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Bio = styled.p`
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
  font-weight: ${tokens.font.weight.normal};

  @media ${QUERY.TABLET} {
    font-size: ${tokens.font.size.lg};
    letter-spacing: ${tokens.font.letter_spacing.lg};
    line-height: calc(${tokens.font.line_height.lg} + 4px);
  }
`;

const InfoShareToEarnContainer = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;

  @media ${QUERY.TABLET} {
    gap: 0;
    align-content: space-between;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionHeader = styled.h2`
  font-size: ${tokens.font.size.lg};
  font-weight: ${tokens.font.weight.bold};
  text-transform: uppercase;
  line-height: ${tokens.font.line_height.lg};
  padding-bottom: 20px;
  border-bottom: solid rgba(240, 240, 240, 0.2) 1px;

  @media ${QUERY.TABLET} {
    font-size: ${tokens.font.size.xl};
    line-height: ${tokens.font.line_height.xl};
  }
`;

const SplitLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${QUERY.TABLET} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export default function TaylaParxArtistPage({
  initialDoesUserHaveAccessPass,
  name,
  bio,
  profilePhoto,
  socialHandles,
}: TaylaParxPageProps) {
  const address = useUserUid();

  const [doesUserHaveAccessPass, setDoesUserHaveAccessPass] = useState<boolean>(
    initialDoesUserHaveAccessPass
  );

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated && address) {
      newBlock$
        .pipe(
          switchMap(() => getDoesOwnToken(TAYLA_PARX_ALL_ACCESS_PASS_CONTRACT_ADDRESS, address)),
          distinctUntilChanged()
        )
        .subscribe(setDoesUserHaveAccessPass);
    } else if (!isAuthenticated) {
      setDoesUserHaveAccessPass(false);
    }
  }, [isAuthenticated, address]);

  return (
    <PageContainer>
      <ProfileContainer>
        <ProfilePhotoWrapper>
          <Image
            src={profilePhoto.src}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </ProfilePhotoWrapper>
        <InfoShareToEarnContainer>
          <InfoContainer>
            <Username>{name}</Username>
            <BioSocialsContainer>
              <Bio
                dangerouslySetInnerHTML={{
                  __html: bio,
                }}
              />
              <SocialLinks socialHandles={socialHandles} />
            </BioSocialsContainer>
          </InfoContainer>
          <ShareToEarn doesUserHaveAccessPass={doesUserHaveAccessPass} />
        </InfoShareToEarnContainer>
      </ProfileContainer>
      {doesUserHaveAccessPass && (
        <>
          <Section>
            <SectionHeader>Share To Earn</SectionHeader>
            <MusicVideoRich />
            <SplitLayout>
              <ShareRichOnSpotify />
              <GetPaidForBeingAFan />
            </SplitLayout>
          </Section>
          <Section>
            <SectionHeader>Merch</SectionHeader>
            <Merch />
          </Section>
          {/* <Section>
            <SectionHeader>Exclusive Content</SectionHeader>
            <ExclusiveContent />
          </Section> */}
        </>
      )}
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps<TaylaParxPageProps> = async (context) => {
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: true,
    };
  }

  const address = await getUidServerSide(context);

  const initialDoesUserHaveAccessPass =
    address === undefined
      ? false
      : await getDoesOwnToken('0xcB846098C5f6a86D9775a183F80aFdF174eD1171', address);

  const id = 'tayla-parx';
  const artistData = await getArtist(id);

  if (!artistData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id,
      ...artistData,
      initialDoesUserHaveAccessPass,
    },
  };
};
