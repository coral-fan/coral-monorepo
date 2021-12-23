import { Button } from 'components/ui/buttons';
import { ComponentProps } from 'react';
import { Icon } from 'components/ui';
import shareIconSVG from './shareIcon.svg';

const ShareIcon = <Icon svg={shareIconSVG} />;

export const ShareButton = (props: ComponentProps<'button'>) => (
  <Button icon={ShareIcon} variant={'secondary'} {...props}>
    Share
  </Button>
);
