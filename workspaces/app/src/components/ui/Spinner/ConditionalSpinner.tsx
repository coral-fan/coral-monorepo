import { ReactNode } from 'react';
import { Spinner } from './Spinner';

interface ConditionalSpinnerProps {
  loading?: boolean;
  size?: string;
  color?: string;
  children: ReactNode;
}

export const ConditionalSpinner = ({
  loading = false,
  size,
  color,
  children,
}: ConditionalSpinnerProps) => (loading ? <Spinner size={size} color={color} /> : <>{children}</>);
