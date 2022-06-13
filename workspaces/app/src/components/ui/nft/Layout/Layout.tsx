import { getBadge } from 'components/ui/badges/utils';
import { Artist, Collection, CollectionType } from 'libraries/models';
import { useIsMobile } from 'libraries/window';
import { useCallback, useMemo, useState } from 'react';
import { Details, ImageWithInfo, NftContent, ShareButton, ShareDropModal } from '../components';
import {
  AssetContentContainer,
  Container,
  ContentContainer,
  GatedContentWrapper,
  ImageWrapper,
  NftAssetContainer,
} from './components';

export interface LayoutProps {
  isAsset: boolean;
  type: CollectionType;
  imageUrl: string;
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
  artistId: Artist['id'];
  name: Collection['name'];
  description: Collection['description'];
  details: Collection['details'];
  collectionId: Collection['id'];
  gatedContentElement: JSX.Element | null;
  assetId?: number;
  dropOrAvailable?: JSX.Element;
  similarCollections?: JSX.Element;
  owner?: JSX.Element;
}

/*
  Layout is a generic container for Asset & Collection pages.
*/
export const Layout = ({
  isAsset,
  type,
  imageUrl,
  artistName,
  artistProfilePhoto,
  artistId,
  name,
  description,
  details,
  collectionId,
  gatedContentElement,
  dropOrAvailable,
  similarCollections,
  owner,
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
          artistName={artistName}
          artistProfilePhoto={artistProfilePhoto}
          artistId={artistId}
          isCard={false}
        />
      </ImageWrapper>
    ),
    [imageUrl, artistName, artistProfilePhoto, artistId, isAsset]
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
            {dropOrAvailable}
            {owner}
          </AssetContentContainer>
        </NftAssetContainer>
        <GatedContentWrapper>{gatedContentElement}</GatedContentWrapper>
        {details && <Details details={details} />}
        <ShareButton
          onClick={() => {
            setIsShareModalOpen(true);
          }}
        />
        {isShareModalOpen && (
          <ShareDropModal
            name={name}
            id={collectionId}
            closeShareModal={closeShareModal}
            imageUrl={imageUrl}
            artistName={artistName}
            artistProfilePhoto={artistProfilePhoto}
            description={description}
            Badge={Badge}
          />
        )}
        {similarCollections}
      </ContentContainer>
    </Container>
  );
};
