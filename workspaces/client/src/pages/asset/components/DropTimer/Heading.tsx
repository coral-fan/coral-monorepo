import styled from '@emotion/styled';
import { DropTimerProps, TimeProp } from './types';
import { getDateString, getDateStringShort, getTimeString } from './utils';

const Container = styled.div<TimeProp>`
  font-size: 10px;
  font-weight: 700;
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-left: ${(props) => (props.variant !== 'mini' ? '8px' : '6px')};
`;

export const Heading = ({ timestamp, variant }: DropTimerProps) => {
  const dateString = getDateString(timestamp);
  const dateStringShort = getDateStringShort(timestamp);
  const timeString = getTimeString(timestamp);

  const headingContent = () => {
    if (variant === 'reveal') return 'revealed in';
    if (variant === 'mini') return `${dateStringShort} at ${timeString}`;

    return `Sale starts ${dateString}`;
  };

  const content = headingContent();

  return <Container variant={variant}>{content}</Container>;
};
