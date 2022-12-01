import Image, { ImageProps } from 'next/image';
import { ImageWrapper } from './ExclusiveContent';

export const ContentImage = ({ src }: Pick<ImageProps, 'src'>) => (
  <ImageWrapper>
    <Image src={src} alt="" layout="fill" objectFit="cover" objectPosition="50% 50%" />
  </ImageWrapper>
);
