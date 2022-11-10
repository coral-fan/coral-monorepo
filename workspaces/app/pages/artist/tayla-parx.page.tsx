import styled from '@emotion/styled';
import { WebPlayer } from 'components/features/stream/components/StreamPlayer/components';
import { Avatar, Card, CtaButton, Heading } from 'components/ui';
import { AvatarContainer, SocialLinks } from 'components/ui/profile/Profile/components';
import { useIsAuthenticated } from 'libraries/authentication';
import { newBlock$ } from 'libraries/blockchain/observables';
import { getDoesOwnToken } from 'libraries/blockchain/utils';
import { Artist, getUidServerSide, useUserUid } from 'libraries/models';
import { useIsMobile } from 'libraries/window';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { distinctUntilChanged, switchMap } from 'rxjs';
import tokens, { QUERY } from 'styles/tokens';

interface TaylaParxPageProps {
  initialDoesUserHaveAccess: boolean;
}

const artist: Artist = {
  id: 'tayla-parx',
  name: 'Tayla Parx',
  bio: 'Hey there. I make beats you all love to listen to.</br>Sometimes I do other things like drop cool NFTs.',
  profilePhoto: {
    offsetPercentages: [50, 0] as [number, number],
    scale: 1,
    src: '/images/tayla-parx/profile-photo.png',
  },
  socialHandles: {
    instagram: 'taylaparx',
    spotify: '1LzWWI9v4UKdbBgz8fqi15',
    twitter: 'TAYLAPARX',
  },
  quote: null,
  collections: [],
};

const tweetText = `Join me in @TAYLAPARX community on @coral__fan.\n\nWatch the very special version of her new music video "Rich."\n\nhttps://www.coral.fan/\n\n`;
const socialShareId = `abc123`;

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

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  --gap: ${tokens.spacing.mobile.lg};

  @media ${QUERY.TABLET} {
    flex-direction: row;
    --gap: ${tokens.spacing.desktop.lg};
  }
  gap: var(--gap);
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

const ReferralContentContainer = styled(Card)`
  padding: 20px;
  gap: 20px;
`;

const ReferralContentText = styled.p`
  font-size: 18px;
  line-height: 22px;
`;

const EarnNowButton = styled(CtaButton)`
  padding: 20px;
`;

const PrimaryShareToEarn = () => (
  <ReferralContentContainer>
    <Heading level={2} styleVariant={'h3'}>
      Share To Earn
    </Heading>
    <ReferralContentText>
      Coral rewards you for being a fan. When you share content on Twitter, you earn points that can
      be redeemed any time. Start by sharing your Tayla Parx All Access Pass.
    </ReferralContentText>
    <EarnNowButton>Earn Now</EarnNowButton>
  </ReferralContentContainer>
);

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

  @media ${QUERY.TABLET} {
    font-size: ${tokens.font.size.xl};
    line-height: ${tokens.font.line_height.xl};
  }
`;

export default function TaylaParxArtistPage({ initialDoesUserHaveAccess }: TaylaParxPageProps) {
  const { name, bio, profilePhoto, socialHandles } = artist;
  const isMobile = useIsMobile();
  const avatarSize = isMobile ? 350 : 690;

  const isAuthenticated = useIsAuthenticated();
  const address = useUserUid();

  const [doesUserHaveAccess, setDoesUserHaveAccess] = useState<boolean>(initialDoesUserHaveAccess);

  console.log(isAuthenticated);
  console.log(doesUserHaveAccess);

  useEffect(() => {
    if (address) {
      newBlock$
        .pipe(
          switchMap(() => getDoesOwnToken('0xcB846098C5f6a86D9775a183F80aFdF174eD1171', address)),
          distinctUntilChanged()
        )
        .subscribe(setDoesUserHaveAccess);
    } else {
      setDoesUserHaveAccess(false);
    }
  }, [address]);

  return (
    <PageContainer>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar size={avatarSize} {...profilePhoto} />
        </AvatarContainer>
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
          <PrimaryShareToEarn />
        </InfoShareToEarnContainer>
      </ProfileContainer>
      <Section>
        <SectionHeader>Watch Tayla’s latest music video &#39;Rich&#39;</SectionHeader>
        <WebPlayer mediaId="119ed4b51711edcb98/850c585073124931" />
      </Section>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps<TaylaParxPageProps> = async (context) => {
  const address = await getUidServerSide(context);

  const initialDoesUserHaveAccess =
    address === undefined
      ? false
      : await getDoesOwnToken('0xcB846098C5f6a86D9775a183F80aFdF174eD1171', address);

  return {
    props: {
      initialDoesUserHaveAccess,
    },
  };
};
