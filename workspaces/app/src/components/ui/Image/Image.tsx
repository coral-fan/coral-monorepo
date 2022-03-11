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

const ImageContent = styled(NextImage)<ImageProp>`
  width: 100% !important;
  position: relative !important;
  height: unset !important;
  aspect-ratio: ${(props) => props.aspectRatio};
`;

export interface ImageProp {
  src: string;
  alt?: string;
  objectFit?: 'cover' | 'contain';
  aspectRatio?: number;
}

export const Image = ({ src, alt = '', objectFit = 'contain', aspectRatio = 1 }: ImageProp) => {
  return (
    <ImageWrapper>
      <ImageContent
        src={src}
        alt={alt}
        layout="fill"
        objectFit={objectFit}
        aspectRatio={aspectRatio}
        priority
      />
    </ImageWrapper>
  );
};
