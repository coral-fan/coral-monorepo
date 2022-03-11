/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import { ArtistInfo } from './components';
import { Photo } from 'libraries/models';
import { Image } from 'components/ui';

import { useCallback, useState } from 'react';

// parent container
const ImageWithInfoContainer = styled.div`
  position: relative;
`;

//  image info components
interface ImageInfoContainerProps {
  imageInfoHeight: number;
}

const ArtistInfoContainer = styled.div<ImageInfoContainerProps>`
  position: absolute;
  left: 14px;
  bottom: calc(${({ imageInfoHeight }) => imageInfoHeight}px + 17px);
  height: 0;
  width: 0;
`;

export interface ImageWithInfoProps {
  imageUrl: string;
  artistName: string;
  artistProfilePhoto: Photo;
}

export const ImageWithInfo = ({ imageUrl, artistName, artistProfilePhoto }: ImageWithInfoProps) => {
  const [imageInfoHeight, setImageInfoHeight] = useState(0);

  const imageInfoRef = useCallback((element: HTMLDivElement) => {
    if (element) {
      setImageInfoHeight(element.offsetHeight);
    }
  }, []);

  return (
    <ImageWithInfoContainer>
      <Image src={imageUrl} />
      <ArtistInfoContainer imageInfoHeight={imageInfoHeight}>
        <ArtistInfo ref={imageInfoRef} profilePhoto={artistProfilePhoto}>
          {artistName}
        </ArtistInfo>
      </ArtistInfoContainer>
    </ImageWithInfoContainer>
  );
};
