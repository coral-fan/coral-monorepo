import styled from '@emotion/styled';
import NextImage from 'next/image';

export interface ImageProps {
  src: string;
}

/*
NextImage solution adapted from:
https://github.com/vercel/next.js/discussions/18739#discussioncomment-344932
*/

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const BaseImage = styled(NextImage)`
  object-fit: contain;
  width: 100% !important;
  height: unset !important;
`;

export const Image = ({ src }: ImageProps) => (
  <Wrapper>
    <BaseImage src={src} alt={''} layout="fill" />
  </Wrapper>
);
