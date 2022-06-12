import { ReactNode } from 'react';
import { Spinner } from './Spinner';
import { SpinnerProps } from './types';

interface ConditionalSpinnerProps extends SpinnerProps {
  loading?: boolean;
  children: ReactNode;
}

export const ConditionalSpinner = ({
  loading,
  size,
  color,
  center,
  children,
}: ConditionalSpinnerProps) =>
  loading ? <Spinner size={size} color={color} center={center} /> : <>{children}</>;
