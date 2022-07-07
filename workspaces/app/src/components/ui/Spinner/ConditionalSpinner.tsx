import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Spinner } from './Spinner';
import { SpinnerProps } from './types';

interface WrapperProp {
  center?: boolean;
}
export const Wrapper = styled.div<WrapperProp>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  min-height: auto;
  ${({ center }) => (center ? 'align-items: center;' : null)}
`;

interface ConditionalSpinnerProps extends SpinnerProps {
  loading?: boolean;
  center?: boolean;
  children: ReactNode;
}

export const ConditionalSpinner = ({
  loading,
  size,
  color,
  center,
  children,
}: ConditionalSpinnerProps) =>
  loading ? (
    <Wrapper center={center}>
      <Spinner size={size} color={color} />
    </Wrapper>
  ) : (
    <>{children}</>
  );
