import styled from '@emotion/styled';
import { SocialLinks } from 'components/ui/profile/Profile/components';
import { useIsAuthenticated } from 'libraries/authentication';
import { newBlock$ } from 'libraries/blockchain/observables';
import { getDoesOwnToken } from 'libraries/blockchain/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { distinctUntilChanged, switchMap } from 'rxjs';
import tokens, { QUERY } from 'styles/tokens';
import { ShareRichOnSpotify } from './components/ShareRichOnSpotify';
import { GetPaidForBeingAFan } from './components/GetPaidForBeingAFan';
import { ShareToEarn } from './components/ShareToEarn';
import { MusicVideoRich } from './components/MusicVideoRich';
import { RedeemPoints } from './components/RedeemPoints';
import { useTaylaParxStore } from './store';
import { useUserUid } from 'libraries/models';

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

export default function TaylaParxArtistPage() {
  const address = useUserUid();

  const { initialDoesUserHaveAccessPass, metadata, profilePhoto, name, bio, socialHandles } =
    useTaylaParxStore();

  const [doesUserHaveAccessPass, setDoesUserHaveAccessPass] = useState<boolean>(
    initialDoesUserHaveAccessPass
  );

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated && address) {
      newBlock$
        .pipe(
          switchMap(() => getDoesOwnToken(metadata.id.allAccessPass, address)),
          distinctUntilChanged()
        )
        .subscribe(setDoesUserHaveAccessPass);
    } else if (!isAuthenticated) {
      setDoesUserHaveAccessPass(false);
    }
  }, [isAuthenticated, address, metadata.id.allAccessPass]);
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
          {/* <Section>
            <SectionHeader>Merch</SectionHeader>
            <Merch />
          </Section> */}
          {/* <Section>
            <SectionHeader>Exclusive Content</SectionHeader>
            <ExclusiveContent />
          </Section> */}
          <Section>
            <SectionHeader>Redeem Points</SectionHeader>
            <RedeemPoints />
          </Section>
        </>
      )}
    </PageContainer>
  );
}
