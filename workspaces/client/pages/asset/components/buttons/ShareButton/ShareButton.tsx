import { Button } from 'components/ui/buttons';
import { ComponentProps } from 'react';
import { Icon } from 'components/ui';
import shareIconSVG from './shareIconSVG.svg';

const shareIcon = <Icon svg={shareIconSVG} />;

export const ShareButton = (props: ComponentProps<'button'>) => (
  <Button icon={shareIcon} variant={'secondary'} {...props}>
    Share
  </Button>
);
