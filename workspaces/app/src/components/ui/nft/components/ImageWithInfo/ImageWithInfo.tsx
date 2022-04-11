/* eslint-disable jsx-a11y/alt-text */
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { ArtistInfo } from './components';
import { Artist } from 'libraries/models';
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
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
  id?: Artist['id'];
  isCard?: boolean;
}

export const ImageWithInfo = ({
  imageUrl,
  artistName,
  artistProfilePhoto,
  id,
  isCard,
}: ImageWithInfoProps) => {
  const [imageInfoHeight, setImageInfoHeight] = useState(0);

  const imageInfoRef = useCallback((element: HTMLDivElement) => {
    if (element) {
      setImageInfoHeight(element.offsetHeight);
    }
  }, []);

  return (
    <ImageWithInfoContainer>
      <Image src={imageUrl} />
      <ArtistInfoContainer isCard={isCard} imageInfoHeight={imageInfoHeight}>
        <ConditionalWrap
          condition={!!id}
          wrap={(children) => (
            <LinkWrapper>
              <Link href={`/artist/${id}`}>{children}</Link>
            </LinkWrapper>
          )}
        >
          <ArtistInfo ref={imageInfoRef} profilePhoto={artistProfilePhoto}>
            {artistName}
          </ArtistInfo>
        </ConditionalWrap>
      </ArtistInfoContainer>
    </ImageWithInfoContainer>
  );
};
