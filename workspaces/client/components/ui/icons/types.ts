export interface IconProps {
  svg: string;
  size?: number;
  alt?: string;
}

export type SingleIconProps = Omit<IconProps, 'svg'>;
