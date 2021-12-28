import { getBadgeStyle } from './utils';
import { badgeSizeDictionary } from './consts';
import { BaseBadgeProps } from './types';
import { getIconComponent } from '../icons/utils';

export const Badge = ({ iconComponent, size, svg, variant = 'primary' }: BaseBadgeProps) => {
  const Icon = getIconComponent(iconComponent, svg);

  return (
    <div css={getBadgeStyle(size, variant)}>
      <Icon size={badgeSizeDictionary[size].icon} />
    </div>
  );
};
