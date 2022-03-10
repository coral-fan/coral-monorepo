/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import NextImage from 'next/image';

// image components
const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  > span {
    position: unset !important;
    height: 100%;
  }
`;

const ImageContent = styled(NextImage)`
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

export interface ImageProp {
  src: string;
}

export const Image = ({ src }: ImageProp) => {
  return (
    <ImageWrapper>
      <ImageContent src={src} alt={''} layout="fill" objectFit="contain" priority />
    </ImageWrapper>
  );
};
