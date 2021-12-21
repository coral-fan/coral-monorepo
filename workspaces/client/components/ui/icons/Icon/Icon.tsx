/* eslint-disable @next/next/no-img-element */
import { IconProps } from '../types';

export const Icon = ({ svg, size, alt }: IconProps) => {
  return <img src={svg} alt={alt} width={size} height={size} />;
};
