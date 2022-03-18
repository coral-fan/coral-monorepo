import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { textStyle } from './styles';

export const Label = styled.label`
  ${textStyle};
  color: ${tokens.font.color.primary};
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 6px;
`;

export const Error = styled.div`
  ${textStyle};
  min-height: 12px;
  color: ${tokens.font.color.error};
`;
