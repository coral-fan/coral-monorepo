import { getBadge } from 'components/ui/badges/utils';
import { Artist, CollectionType, Details as DetailsType } from 'libraries/models';
import { useIsMobile } from 'libraries/window';
import { useCallback, useState } from 'react';
import { Details, ImageWithInfo, NftContent, ShareButton, ShareDropModal } from '../components';
import {
  AssetContentContainer,
  Container,
  ContentContainer,
  GatedContentWrapper,
  ImageWrapper,
  NftAssetContainer,
} from './components';

interface LayoutProps {
  isAsset: boolean;
  type: CollectionType;
  imageUrl: string;
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
  name: string;
  description: string;
  details: DetailsType;
  collectionId: string;
  gatedContent?: JSX.Element | null;
  assetId?: number;
  dropOrAvailable?: JSX.Element;
  similarCollections?: JSX.Element;
  owner?: JSX.Element;
}

// Dummy Data: comes from Smart Contract Call
// Todo: Update AVAX pricing

export const Layout = ({
  isAsset,
  type,
  imageUrl,
  artistName,
  artistProfilePhoto,
  name,
  description,
  details,
  collectionId,
  gatedContent,
  dropOrAvailable,
  similarCollections,
  owner,
}: LayoutProps) => {
  const isMobile = useIsMobile();

  const Badge = getBadge(type);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const closeShareModal = useCallback(() => setIsShareModalOpen(false), []);

  const image = (
    <ImageWrapper isAsset={isAsset}>
      <ImageWithInfo
        imageUrl={imageUrl}
        artistName={artistName}
        artistProfilePhoto={artistProfilePhoto}
        isCard={false}
      />
    </ImageWrapper>
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
              titleStyleVariant={'h1'}
              description={description}
              Badge={Badge}
              isCard={false}
            />
            {dropOrAvailable}
            {owner}
          </AssetContentContainer>
        </NftAssetContainer>
        <GatedContentWrapper>{gatedContent}</GatedContentWrapper>
        {details && <Details details={details} />}
        <ShareButton
          onClick={() => {
            console.log('clicked');
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
