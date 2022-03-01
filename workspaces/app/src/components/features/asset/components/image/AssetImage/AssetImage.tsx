/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import { Image } from '../Image';
import { ImageInfo } from '../ImageInfo';
import { ProfilePhoto } from 'libraries/models';

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 14px;
  bottom: 17px;
`;

export interface AssetImageProps {
  src: string;
  altText: string;
  username: string;
  profilePhoto: ProfilePhoto;
}

export const AssetImage = ({ src, altText, username, profilePhoto }: AssetImageProps) => (
  <Container>
    <Image src={src} altText={altText} />
    <Wrapper>
      <ImageInfo profilePhoto={profilePhoto}>{username}</ImageInfo>
    </Wrapper>
  </Container>
);
