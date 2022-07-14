import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { CreatorInfo } from './components';
import { Artist, Photo } from 'libraries/models';
import { ConditionalWrap, Image, Link } from 'components/ui';

// parent container
const ImageWithInfoContainer = styled.div`
  position: relative;
`;

//  image info components
interface ImageInfoContainerProps {
  imageInfoHeight: number;
  isCard?: boolean;
}

const ArtistInfoContainer = styled.div<ImageInfoContainerProps>`
  position: absolute;
  left: 14px;
  bottom: calc(${({ imageInfoHeight }) => imageInfoHeight}px + 17px);
  height: 0;
  width: 0;
`;

const LinkWrapper = styled.div`
  width: fit-content;
  &:hover {
    opacity: 88%;
  }
`;

export interface ImageWithInfoProps {
  imageUrl: string;
  creatorName: string;
  creatorProfilePhoto: Photo;
  artistId?: Artist['id'];
  isCard?: boolean;
}

export const ImageWithInfo = ({
  imageUrl,
  creatorName,
  creatorProfilePhoto,
  artistId,
  isCard,
}: ImageWithInfoProps) => {
  const [imageInfoHeight, setImageInfoHeight] = useState(0);

  const imageInfoRef = useCallback((element: HTMLDivElement) => {
    if (element) {
      setImageInfoHeight(element.offsetHeight);
    }
  }, []);

  const hasArtistId = useMemo(() => (artistId ? true : false), [artistId]);

  return (
    <ImageWithInfoContainer>
      <Image src={imageUrl} alt="" />
      <ArtistInfoContainer isCard={isCard} imageInfoHeight={imageInfoHeight}>
        <ConditionalWrap
          shouldWrap={hasArtistId}
          wrap={(children) => (
            <LinkWrapper>
              <Link href={`/artist/${artistId}`}>{children}</Link>
            </LinkWrapper>
          )}
        >
          <CreatorInfo ref={imageInfoRef} profilePhoto={creatorProfilePhoto}>
            {creatorName}
          </CreatorInfo>
        </ConditionalWrap>
      </ArtistInfoContainer>
    </ImageWithInfoContainer>
  );
};
