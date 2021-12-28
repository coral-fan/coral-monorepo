import { sizeDictionary } from './consts';

export type BadgeSize = keyof typeof sizeDictionary;

export type BadgeVariant = 'primary' | 'secondary';

export interface BaseBadgeProps {
  size: BadgeSize;
  svg: string;
  variant?: BadgeVariant;
}

export type BadgeProps = Omit<BaseBadgeProps, 'svg'>;
