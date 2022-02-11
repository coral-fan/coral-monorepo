export interface BaseIconProps {
  svg: string;
  size?: number;
  alt?: string;
}
export type IconProps = Omit<BaseIconProps, 'svg'>;
