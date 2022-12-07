import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SocialLinks } from 'components/ui/profile/Profile/components';
import { Artist, getUidServerSide } from 'libraries/models';
import Image from 'next/image';
import tokens, { QUERY } from 'styles/tokens';
import { FeaturedContent } from './components/FeaturedContent';
import { ShareTheMopNFTOnZora } from './components/ShareTheMopNFTOnZora';
import { GetPaidForBeingAFan } from './components/GetPaidForBeingAFan';
import { ShareToEarn } from './components/ShareToEarn';
import { useIsAuthenticated } from 'libraries/authentication';
import { CommunityBenefits } from './components/CommunityBenefits';
import { GetServerSideProps } from 'next';
import { getDoesOwnToken } from 'libraries/blockchain/utils';
import { PINDER_NFT_CONTRACT_ADDRESS } from 'consts';
import { GatedContent } from './components/GatedContent';
import { Link } from 'components/ui';

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
    instagram: 'pindersongs',
    spotify: '4VNhdOgxfxVzFRWLNPP2kz',
    twitter: 'JPinder',
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

interface PinderArtistPageProps {
  doesOwnPinderNft: boolean;
}

export default function PinderArtistPage({ doesOwnPinderNft }: PinderArtistPageProps) {
  const { name, bio, profilePhoto, socialHandles } = artist;

  const isAuthenticated = useIsAuthenticated();

  return (
    // <GatedContent
    //   doesOwnPinderNft
    //   accessDeniedModalProps={{
    //     title: "You don't have access",
    //     actionElement: (
    //       <div>
    //         {'Only holders of '}
    //         <Link
    //           css={css`
    //             text-decoration: underline;
    //           `}
    //           href={`https://www.sound.xyz/pinder/the-mop`}
    //         >
    //           The Mop NFT
    //         </Link>
    //         {" have access to Pinder's Artist page."}
    //       </div>
    //     ),
    //   }}
    // >
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
      <SplitLayout>
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
        <CommunityBenefits doesOwnPinderNft={doesOwnPinderNft} />
      </Section>
    </PageContainer>
    // </GatedContent>
  );
}

export const getServerSideProps: GetServerSideProps<PinderArtistPageProps> = async (context) => {
  const address = await getUidServerSide(context);

  const doesOwnPinderNft =
    address === undefined
      ? false
      : await getDoesOwnToken(PINDER_NFT_CONTRACT_ADDRESS, address, false);

  return {
    props: {
      doesOwnPinderNft,
    },
  };
};
