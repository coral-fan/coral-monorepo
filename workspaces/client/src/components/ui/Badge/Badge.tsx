import { getBadgeStyle } from './utils';
import { Icon } from 'components/ui/Icon';
import { badgeSizeDictionary } from './consts';
import { BaseBadgeProps } from './types';

export const Badge = ({ size, svg, variant = 'primary' }: BaseBadgeProps) => {
  return (
    <div css={getBadgeStyle(size, variant)}>
      <Icon svg={svg} size={badgeSizeDictionary[size].icon} />
    </div>
  );
};
