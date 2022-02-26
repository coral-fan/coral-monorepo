import { ComponentProps } from 'react';
import { CloseIcon } from 'components/ui';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const SIZE = '45px';

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${SIZE};
  height: ${SIZE};
  color: ${tokens.font.color.primary};
  background-color: ${tokens.background.color.secondary};
  border: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const CloseButton = (props: ComponentProps<'button'>) => (
  <Wrapper {...props}>
    <CloseIcon size={22.5} />
  </Wrapper>
);
