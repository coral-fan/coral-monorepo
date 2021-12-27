/* eslint-disable @next/next/no-img-element */

export interface IconProps {
  svg: string;
  size?: number;
  alt?: string;
}

export type SingleIconProps = Omit<IconProps, 'svg'>;

export const Icon = ({ svg, size, alt }: IconProps) => {
  return <img src={svg} alt={alt} width={size} height={size} />;
};
