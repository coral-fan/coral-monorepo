import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Card } from 'components/ui/Card';
import tokens from 'styles/tokens';
import { BaseInfo, BaseInfoProps } from '../components';

interface DropCardProps extends BaseInfoProps {
  Badge: () => EmotionJSX.Element;
  dropDateTimestamp: string;
}

const DropCardContainer = styled(Card)`
  overflow: hidden;
  width: 300px;
`;

const BadgeAndDropDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: ${tokens.font.size.xs};
  font-weight: ${tokens.font.weight.bold};
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
export const DropCard = ({ Badge, dropDateTimestamp, ...baseInfoProps }: DropCardProps) => (
  <DropCardContainer>
    <BaseInfo {...baseInfoProps}>
      <BadgeAndDropDateContainer>
        <Badge />
        <DropDateContainer>
          <span>Drops On</span>
          <span>{formatDropCardDate(dropDateTimestamp)}</span>
        </DropDateContainer>
      </BadgeAndDropDateContainer>
    </BaseInfo>
  </DropCardContainer>
);
