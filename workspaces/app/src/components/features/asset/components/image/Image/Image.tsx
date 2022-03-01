import styled from '@emotion/styled';
import NextImage from 'next/image';

export interface ImageProps {
  src: string;
  altText: string;
}

/*
NextImage solution adapted from:
https://github.com/vercel/next.js/discussions/18739#discussioncomment-344932
*/

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledImage = styled(NextImage)`
  object-fit: contain;
  width: 100% !important;
  height: unset !important;
`;

export const Image = ({ src, altText }: ImageProps) => (
  <Wrapper>
    <StyledImage src={src} alt={altText} layout="fill" />
  </Wrapper>
);
