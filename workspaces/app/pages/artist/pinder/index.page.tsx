import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SocialLinks } from 'components/ui/profile/Profile/components';
import { Artist } from 'libraries/models';
import Image from 'next/image';
import tokens, { QUERY } from 'styles/tokens';
import { FeaturedContent } from './components/FeaturedContent';
import { ShareTheMopNFTOnZora } from './components/ShareTheMopNFTOnZora';
import { GetPaidForBeingAFan } from './components/GetPaidForBeingAFan';
import { ShareToEarn } from './components/ShareToEarn';
import { useIsAuthenticated } from 'libraries/authentication';
import { CommunityBenefits } from './components/CommunityBenefits';

const artist: Artist = {
  id: 'pinder',
  name: 'Pinder',
  bio: 'Working artist, from Seattle, Washington, residing in Los Angeles. IYKYK.',
  profilePhoto: {
    offsetPercentages: [0, 0] as [number, number],
    scale: 2,
    src: '/images/pinder/profile-photo.png',
  },
  socialHandles: {
    instagram: 'taylaparx',
    spotify: '1LzWWI9v4UKdbBgz8fqi15',
    twitter: 'TAYLAPARX',
  },
  quote: null,
  collections: [],
};

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

interface SectionHeaderProps {
  noDivider?: boolean;
}

const SectionHeader = styled.h2<SectionHeaderProps>`
  font-size: ${tokens.font.size.lg};
  font-weight: ${tokens.font.weight.bold};
  text-transform: uppercase;
  line-height: ${tokens.font.line_height.lg};

  ${({ noDivider }) =>
    noDivider
      ? null
      : css`
          padding-bottom: 20px;
          border-bottom: solid rgba(240, 240, 240, 0.2) 1px;
        `}

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

export default function PinderArtistPage() {
  const { name, bio, profilePhoto, socialHandles } = artist;

  const isAuthenticated = useIsAuthenticated();

  const doesOwnPinderNft = true;
  return (
    <PageContainer>
      <ProfileContainer>
        <ProfilePhotoWrapper>
          <Image
            src={profilePhoto.src}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="35% 50%"
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
          <ShareToEarn doesOwnPinderNft={doesOwnPinderNft} />
        </InfoShareToEarnContainer>
      </ProfileContainer>
      {isAuthenticated && (
        <>
          {/* post drop starts */}
          {/* <SplitLayout>
            <Section>
              <SectionHeader>Featured Campaigns</SectionHeader>
              <ShareTheMopNFTOnZora doesOwnPinderNft={doesOwnPinderNft} />
            </Section>
            <Section>
              <GetPaidForBeingAFan />
            </Section>
          </SplitLayout>
          <Section>
            <SectionHeader>Community Benefits</SectionHeader>
            <CommunityBenefits />
          </Section> */}
          {/* post drop ends */}
          {/* pre drop starts */}
          <Section>
            <SectionHeader>Featured Content</SectionHeader>
            <FeaturedContent doesOwnPinderNft={doesOwnPinderNft} />
          </Section>
          <SplitLayout>
            <Section>
              <SectionHeader>Upcoming Campaigns</SectionHeader>
              <ShareTheMopNFTOnZora doesOwnPinderNft={doesOwnPinderNft} />
            </Section>
            <Section>
              <GetPaidForBeingAFan />
            </Section>
          </SplitLayout>
          {/* pre drop end */}
        </>
      )}
    </PageContainer>
  );
}
