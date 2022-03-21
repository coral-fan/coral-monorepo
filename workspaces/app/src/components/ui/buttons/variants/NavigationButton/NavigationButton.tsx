import styled from '@emotion/styled';
import { ComponentProps, FC } from 'react';
import { BaseButton } from 'components/ui/buttons/BaseButton';
import { navigationButtonStyle } from '../../styles';

const Wrapper = styled(BaseButton)`
  ${navigationButtonStyle};
`;

export const NavigationButton: FC<ComponentProps<'button'>> = ({ children, ...props }) => (
  <Wrapper transparent={false} {...props}>
    {children}
  </Wrapper>
);
