import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { Card } from 'components/ui/Card';
import { useCallback } from 'react';
import tokens from 'styles/tokens';
import { BaseInfo, BaseInfoProps } from '../components';

export interface DropCardProps
  extends Omit<BaseInfoProps, 'titleHeadingLevel' | 'titleStyleVariant' | 'children'> {
  Badge: () => EmotionJSX.Element;
  id: string;
  dropTimestamp: string;
  price: number;
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

const PriceDateBaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: ${tokens.font.weight.bold};
  flex-shrink: 0;
`;

const DropDateContainer = styled(PriceDateBaseContainer)`
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  line-height: ${tokens.font.line_height.xs};
`;

const PriceContainer = styled(PriceDateBaseContainer)`
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
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

const getIsDropped = (dropTimestamp: string) =>
  new Date(dropTimestamp).getTime() < new Date().getTime();

export const DropCard = ({ Badge, dropTimestamp, id, price, ...baseInfoProps }: DropCardProps) => (
  <Link href={`/collection/${id}`}>
    <DropCardContainer>
      <BaseInfo titleHeadingLevel={3} titleStyleVariant={'h3'} {...baseInfoProps}>
        <BadgeAndDropDateContainer>
          <Badge />
          {getIsDropped(dropTimestamp) ? (
            <PriceContainer>${price.toFixed(2)}</PriceContainer>
          ) : (
            <DropDateContainer>
              <span>Drops on</span>
              <span>{formatDropCardDate(dropTimestamp)}</span>
            </DropDateContainer>
          )}
        </BadgeAndDropDateContainer>
      </BaseInfo>
    </DropCardContainer>
  </Link>
);
