/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import { ArtistInfo } from './components';
import { Photo } from 'libraries/models';
import { Image } from 'components/ui';

import { useCallback, useState } from 'react';
import tokens, { QUERY } from 'styles/tokens';

// parent container
const ImageWithInfoContainer = styled.div`
  position: relative;
`;

//  image info components
interface ImageInfoContainerProps {
  imageInfoHeight: number;
  isCard: boolean;
}

const ArtistInfoContainer = styled.div<ImageInfoContainerProps>`
  position: absolute;
  left: calc(${({ isCard }) => (isCard ? '14px' : tokens.layout.padding.mobile.horizontal)});
  bottom: calc(${({ imageInfoHeight }) => imageInfoHeight}px + 17px);
  height: 0;
  width: 0;

  @media ${QUERY.LAPTOP} {
    left: calc(${({ isCard }) => (isCard ? '14px' : tokens.layout.padding.desktop.horizontal)});
  }
`;

export interface ImageWithInfoProps {
  imageUrl: string;
  artistName: string;
  artistProfilePhoto: Photo;
  isCard: boolean;
}

export const ImageWithInfo = ({
  imageUrl,
  artistName,
  artistProfilePhoto,
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
        <ArtistInfo ref={imageInfoRef} profilePhoto={artistProfilePhoto}>
          {artistName}
        </ArtistInfo>
      </ArtistInfoContainer>
    </ImageWithInfoContainer>
  );
};
