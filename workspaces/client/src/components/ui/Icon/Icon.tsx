/* eslint-disable @next/next/no-img-element */

export interface BaseIconProps {
  svg: string;
  size?: number;
  alt?: string;
}

export type IconProps = Omit<BaseIconProps, 'svg'>;

export const Icon = ({ svg, size, alt }: BaseIconProps) => {
  return <img src={svg} alt={alt} width={size} height={size} />;
};
