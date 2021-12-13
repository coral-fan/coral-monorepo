import { FC } from 'react';
import { Spinner } from './Spinner';

interface ConditionalSpinnerProps {
  loading: boolean;
}

export const ConditionalSpinner: FC<ConditionalSpinnerProps> = ({ loading, children }) =>
  loading ? <Spinner /> : <>{children}</>;
