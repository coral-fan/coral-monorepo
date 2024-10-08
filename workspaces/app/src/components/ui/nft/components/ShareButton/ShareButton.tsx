import { Button } from 'components/ui/buttons';
import { ComponentProps } from 'react';

export const ShareButton = (props: ComponentProps<'button'>) => (
  <Button {...props}>Share This NFT</Button>
);
