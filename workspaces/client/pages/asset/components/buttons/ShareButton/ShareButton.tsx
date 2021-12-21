import { Button } from 'components/ui/buttons';
import { ComponentProps } from 'react';
import { Icon } from 'components/ui';
import shareIconSVG from './shareIconSVG.svg';

export const ShareButton = (props: ComponentProps<'button'>) => (
  <Button variant={'secondary'} {...props}>
    <Icon svg={shareIconSVG} />
    Share
  </Button>
);
