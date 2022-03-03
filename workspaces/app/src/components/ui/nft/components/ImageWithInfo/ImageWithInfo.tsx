/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import NextImage from 'next/image';
import { ImageInfo } from './components';
import { Photo } from 'libraries/models';

const ImageWithInfoContainer = styled.div`
  width: 100%;
  /* position: relative; */
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
    <NextImage src={src} alt={''} layout="fill" />
    <ImageInfoContainer>
      <ImageInfo profilePhoto={profilePhoto}>{artist}</ImageInfo>
    </ImageInfoContainer>
  </ImageWithInfoContainer>
);
