import { FC } from 'react';
import { Spinner } from './Spinner';

interface ConditionalSpinnerProps {
  loading?: boolean;
  size?: string;
  color?: string;
}

export const ConditionalSpinner: FC<ConditionalSpinnerProps> = ({
  loading = false,
  size,
  color,
  children,
}) => (loading ? <Spinner size={size} color={color} /> : <>{children}</>);
