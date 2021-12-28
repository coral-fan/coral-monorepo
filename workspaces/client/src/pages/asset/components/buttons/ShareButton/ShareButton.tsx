import { Button } from 'components/ui/buttons';
import { getIconComponent } from 'components/ui/icons/utils';
import { ComponentProps } from 'react';
import shareIconSVG from './share.svg';

const ShareIcon = getIconComponent('ShareIcon', shareIconSVG);

export const ShareButton = (props: ComponentProps<'button'>) => (
  <Button icon={<ShareIcon />} variant={'secondary'} {...props}>
    Share
  </Button>
);
