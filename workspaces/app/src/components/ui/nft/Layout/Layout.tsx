import { getBadge } from 'components/ui/badges/utils';
import { Artist, Collection, CollectionType, ReferralCampaignData } from 'libraries/models';
import { useIsMobile } from 'libraries/window';
import { useCallback, useMemo, useState } from 'react';
import { Details, ImageWithInfo, NftContent, ShareButton, ShareDropModal } from '../components';
import { CollectionBackLink } from './components/CollectionBackLink';

import {
  AssetContentContainer,
  Container,
  ContentContainer,
  ImageWrapper,
  NftAssetContainer,
} from './components';

import { ShareToEarn } from './components/ShareToEarn';
export interface LayoutProps {
  isAsset: boolean;
  type: CollectionType;
  imageUrl: string;
  creatorName: Artist['name'];
  creatorProfilePhoto: Artist['profilePhoto'];
  artistId?: Artist['id'];
  name: Collection['name'];
  description: Collection['description'];
  details: Collection['details'];
  collectionId: Collection['id'];
  gatedContentElement?: JSX.Element | null;
  assetId?: number;
  dropOrAvailable?: JSX.Element;
  similarCollections?: JSX.Element;
  owner?: JSX.Element;
  activeCampaign?: string;
  referralCampaign?: ReferralCampaignData;
}

/*
  Layout is a generic container for Asset & Collection pages.
*/
export const Layout = ({
  isAsset,
  type,
  imageUrl,
  creatorName,
  creatorProfilePhoto,
  artistId,
  name,
  description,
  details,
  collectionId,
  gatedContentElement,
  dropOrAvailable,
  similarCollections,
  owner,
  activeCampaign,
}: LayoutProps) => {
  const isMobile = useIsMobile();

  const Badge = getBadge(type);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const closeShareModal = useCallback(() => setIsShareModalOpen(false), []);

  const image = useMemo(
    () => (
      <ImageWrapper isAsset={isAsset}>
        <ImageWithInfo
          imageUrl={imageUrl}
          creatorName={creatorName}
          creatorProfilePhoto={creatorProfilePhoto}
          artistId={artistId}
          isCard={false}
        />
      </ImageWrapper>
    ),
    [imageUrl, creatorName, creatorProfilePhoto, artistId, isAsset]
  );

  return (
    <Container isAsset={isAsset}>
      {!isMobile && image}
      <ContentContainer isAsset={isAsset}>
        <NftAssetContainer isAsset={isAsset}>
          {isMobile && image}
          <AssetContentContainer isAsset={isAsset}>
            <NftContent
              title={name}
              titleHeadingLevel={2}
              titleStyleVariant={isMobile ? 'h2' : 'h1'}
              description={description}
              Badge={Badge}
              isCard={false}
            />
            {isAsset && <CollectionBackLink collectionId={collectionId} />}
            {dropOrAvailable}
            {owner}
          </AssetContentContainer>
        </NftAssetContainer>
        {gatedContentElement}
        {details && <Details details={details} />}
        {activeCampaign ? (
          <ShareToEarn
            campaignId={activeCampaign}
            collectionId={collectionId}
            collectionName={name}
          />
        ) : (
          <ShareButton
            onClick={() => {
              setIsShareModalOpen(true);
            }}
          />
        )}
        {isShareModalOpen && (
          <ShareDropModal
            name={name}
            id={collectionId}
            closeShareModal={closeShareModal}
            imageUrl={imageUrl}
            creatorName={creatorName}
            creatorArtistPhoto={creatorProfilePhoto}
            description={description}
            Badge={Badge}
          />
        )}
        {similarCollections}
      </ContentContainer>
    </Container>
  );
};
