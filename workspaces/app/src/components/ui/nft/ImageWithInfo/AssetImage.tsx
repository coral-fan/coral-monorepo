/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import { Image, ImageInfo } from './components';
import { Photo } from 'libraries/models';

const ImageWithInfoContainer = styled.div`
  width: 100%;
  position: relative;
`;

const ImageInfoContainer = styled.div`
  position: absolute;
  left: 14px;
  bottom: 17px;
`;

export interface ImageWithInfoProps {
  src: string;
  altText: string;
  artist: string;
  profilePhoto: Photo;
}

export const ImageWithInfo = ({ src, artist, profilePhoto }: ImageWithInfoProps) => (
  <ImageWithInfoContainer>
    <Image src={src} />
    <ImageInfoContainer>
      <ImageInfo profilePhoto={profilePhoto}>{artist}</ImageInfo>
    </ImageInfoContainer>
  </ImageWithInfoContainer>
);
