import { ComponentProps } from 'react';

export type Variant = undefined | 'mini';

type TimeUnit = 'days' | 'hrs' | 'mins' | 'secs';

export interface TimePartProps {
  timeNum: number;
  timeUnit: TimeUnit;
  variant: Variant;
}

export interface DropTimerProp {
  timestamp: string;
  variant?: Variant;
}

export interface TimeProp extends ComponentProps<'div'> {
  variant?: Variant;
}
