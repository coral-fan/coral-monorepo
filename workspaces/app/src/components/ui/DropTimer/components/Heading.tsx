import styled from '@emotion/styled';
import { TimeProp, Variant } from '../types';
import { getDateString, getDateStringShort, getTimeString } from '../utils';

const Container = styled.div<TimeProp>`
  font-size: 10px;
  font-weight: 700;
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-left: ${(props) => (props.variant !== 'mini' ? '8px' : '6px')};
`;

const getHeadingContent = (variant: Variant, timestamp: string) => {
  const dateString = getDateString(timestamp);
  const dateStringShort = getDateStringShort(timestamp);
  const timeString = getTimeString(timestamp);

  switch (variant) {
    case 'reveal':
      return 'revealed in';
    case 'mini':
      return `${dateStringShort} at ${timeString}`;
    default:
      return `Sale starts ${dateString}`;
  }
};

interface HeadingProps {
  timestamp: string;
  variant: Variant;
}

export const Heading = ({ timestamp, variant }: HeadingProps) => {
  const content = getHeadingContent(variant, timestamp);

  return <Container variant={variant}>{content}</Container>;
};
