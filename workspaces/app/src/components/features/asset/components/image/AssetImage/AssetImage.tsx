/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import { Image } from '../Image';
import { ImageInfo } from '../ImageInfo';
import { Photo } from 'libraries/models';

const AssetImageContainer = styled.div`
  width: 100%;
  position: relative;
`;

const ImageInfoContainer = styled.div`
  position: absolute;
  left: 14px;
  bottom: 17px;
`;

export interface AssetImageProps {
  src: string;
  altText: string;
  username: string;
  profilePhoto: Photo;
}

export const AssetImage = ({ src, altText, username, profilePhoto }: AssetImageProps) => (
  <AssetImageContainer>
    <Image src={src} altText={altText} />
    <ImageInfoContainer>
      <ImageInfo profilePhoto={profilePhoto}>{username}</ImageInfo>
    </ImageInfoContainer>
  </AssetImageContainer>
);
