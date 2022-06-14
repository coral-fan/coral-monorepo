import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { Card } from 'components/ui/Card';
import tokens from 'styles/tokens';
import { BaseInfo, BaseInfoProps } from '../components';

export interface DropCardProps
  extends Omit<BaseInfoProps, 'titleHeadingLevel' | 'titleStyleVariant' | 'children'> {
  Badge: () => EmotionJSX.Element;
  id: string;
  dropTimestamp: string;
}

const DropCardContainer = styled(Card)`
  &:hover {
    opacity: 85%;
  }
`;

const BadgeAndDropDateContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const DropDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing};
  line-height: ${tokens.font.line_height};
  font-weight: ${tokens.font.weight.bold};
  flex-shrink: 0;
`;

const formatDropCardDate = (timestamp: string) => {
  const dropDate = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    timeZoneName: 'short',
  }).format(dropDate);

  return formattedDate;
};

export const DropCard = ({ Badge, dropTimestamp, id, ...baseInfoProps }: DropCardProps) => (
  <Link href={`/collection/${id}`}>
    <DropCardContainer>
      <BaseInfo titleHeadingLevel={3} titleStyleVariant={'h3'} {...baseInfoProps}>
        <BadgeAndDropDateContainer>
          <Badge />
          <DropDateContainer>
            <span>
              {new Date(dropTimestamp).getTime() < new Date().getTime() ? 'Dropped ' : 'Drops '}
              on
            </span>
            <span>{formatDropCardDate(dropTimestamp)}</span>
          </DropDateContainer>
        </BadgeAndDropDateContainer>
      </BaseInfo>
    </DropCardContainer>
  </Link>
);
