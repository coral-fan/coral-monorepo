import { FC } from 'react';
import { Spinner } from './Spinner';

interface ConditionalSpinnerProps {
  loading: boolean;
  size?: string;
}

export const ConditionalSpinner: FC<ConditionalSpinnerProps> = ({ loading, size, children }) =>
  loading ? <Spinner size={size} /> : <>{children}</>;
