import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { LogoIcon } from 'components/ui';
import { IconProps } from 'components/ui/icons/types';

const spin = keyframes`
  0% {
   opacity: 0;
   transform: rotate3d(0, 1, 1, 180deg);
  }
  20% { 
   opacity: 1;
   transform: rotate3d(0, 0, 0, 0deg);
  }
  
  84%{
    opacity: 1;
    transform: scale(1);
  }
  
  100%{
    opacity: 0.25;
    transform: scale(0.75) rotate3d(-1, 1, -1, 120deg);
  }
`;

export type LogoSpinnerProps = IconProps;

export const LogoSpinner = styled(LogoIcon)`
  animation: ${spin} 2.5s ease infinite;
`;
