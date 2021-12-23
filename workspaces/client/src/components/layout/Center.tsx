import { FC } from 'react';
import { Flex } from './Flex';

export const Center: FC<{ className?: string }> = ({ children, className }) => (
  <Flex className={className} justifyContent={'center'} alignItems={'center'}>
    {children}
  </Flex>
);
