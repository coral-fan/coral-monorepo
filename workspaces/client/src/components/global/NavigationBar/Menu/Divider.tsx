import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export const Divider = styled.hr<{ isLast?: boolean }>`
  border-color: ${({ isLast = false }) => (isLast ? tokens.color.white : '#4B4B4B')};
  border-width: 0px 0px thin;
`;
