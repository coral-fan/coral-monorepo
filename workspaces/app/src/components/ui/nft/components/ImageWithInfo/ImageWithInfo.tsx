/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import NextImage from 'next/image';
import { ImageInfo } from './components';
import { Photo } from 'libraries/models';

// parent container
const ImageWithInfoContainer = styled.div`
  width: 100%;
`;

// image components
const ImageWrapper = styled.div`
  width: 100%;
  > span {
    position: unset !important;
    height: 100%;
  }
`;

const Image = styled(NextImage)`
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

//  image info components
const ImageInfoContainer = styled.div`
  transform: translate(1%, -110%);
`;

export interface ImageWithInfoProps {
  src: string;
  artist: string;
  profilePhoto: Photo;
}

export const ImageWithInfo = ({ src, artist, profilePhoto }: ImageWithInfoProps) => (
  <ImageWithInfoContainer>
    <ImageWrapper>
      <Image src={src} alt={''} layout="fill" objectFit="contain" />
    </ImageWrapper>
    <ImageInfoContainer>
      <ImageInfo profilePhoto={profilePhoto}>{artist}</ImageInfo>
    </ImageInfoContainer>
  </ImageWithInfoContainer>
);
