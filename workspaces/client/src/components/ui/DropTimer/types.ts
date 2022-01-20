import { ComponentProps } from 'react';

export type Variant = undefined | 'mini' | 'reveal';

type TimeUnit = 'days' | 'hrs' | 'mins' | 'secs';

export interface TimePartProps {
  timeDiff: number;
  timeUnit: TimeUnit;
  variant: Variant;
}

export interface DropTimerProps {
  timestamp: string;
  variant?: Variant;
}

export interface TimeProp extends ComponentProps<'div'> {
  variant?: Variant;
}
