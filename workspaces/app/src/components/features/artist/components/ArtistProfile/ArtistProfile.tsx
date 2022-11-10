import styled from '@emotion/styled';
import { Card, Heading, Profile } from 'components/ui';
import { Collections } from '../Collections';
import { Artist } from 'libraries/models';
import { Tag as BaseTag } from './components';
import { useMemo } from 'react';

interface ArtistProfileProps {
  artistData: Artist;
}

export const Tag = styled(BaseTag)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: -8px;
`;

const ReferralContentContainer = styled(Card)`
  padding: 16px 14px;
  gap: 16px;
`;

const ReferralContentText = styled.p`
  font-size: 18px;
  line-height: 22px;
`;

const ReferralContent = () => (
  <ReferralContentContainer>
    <Heading level={2} styleVariant={'h3'}>
      Share To Earn
    </Heading>
    <ReferralContentText>
      Generate your own referral links for Artist collections. Every time someone purchases a
      collection item, you earn Coral points redeemable for crypto.
    </ReferralContentText>
  </ReferralContentContainer>
);

// TODO: Revisit tag logic, added as override for Matte
export const ArtistProfile = ({ artistData }: ArtistProfileProps) => {
  const { name, bio, profilePhoto, socialHandles, collections, tag = 'artist' } = artistData;

  const artistCollections = useMemo(() => <Collections collections={collections} />, [collections]);

  const artistTag = useMemo(() => <Tag>{tag}</Tag>, [tag]);

  const hasReferralCampaigns = useMemo(
    () => collections.some((collection) => collection.referralCampaign !== undefined),
    [collections]
  );

  return (
    <Profile
      username={name}
      profilePhoto={profilePhoto}
      bio={bio}
      socialHandles={socialHandles}
      artistTag={artistTag}
      items={artistCollections}
      referralContent={hasReferralCampaigns && <ReferralContent />}
    />
  );
};
