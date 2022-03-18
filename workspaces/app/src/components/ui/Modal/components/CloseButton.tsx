import { ComponentProps } from 'react';
import { CloseIcon } from 'components/ui';
import styled from '@emotion/styled';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${tokens.buttons.size.mobile};
  height: ${tokens.buttons.size.mobile};
  color: ${tokens.font.color.primary};
  background-color: ${tokens.background.color.secondary};
  border: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    width: ${tokens.buttons.size.desktop};
    height: ${tokens.buttons.size.desktop};
  }
`;

export const CloseButton = (props: ComponentProps<'button'>) => (
  <Wrapper {...props}>
    <CloseIcon size={26} />
  </Wrapper>
);
