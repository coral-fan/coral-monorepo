import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export const Button = styled.button`
  color: ${tokens.color.black};
  border-color: ${tokens.color.black};
  background: ${tokens.color.white};

  &:hover {
    cursor: pointer;
  }
`;
