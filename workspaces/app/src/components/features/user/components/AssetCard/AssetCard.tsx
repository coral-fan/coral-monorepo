import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { Card } from 'components/ui/Card';
import { BaseInfo, BaseInfoProps } from 'components/ui';

export interface AssetCardProps
  extends Omit<BaseInfoProps, 'titleHeadingLevel' | 'titleStyleVariant'> {
  Badge: () => EmotionJSX.Element;
  collectionId: string;
  id: number;
}

const AssetCardContainer = styled(Card)`
  &:hover {
    opacity: 85%;
  }
`;

const BadgeAndTokenIdContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export const AssetCard = ({ Badge, collectionId, id, ...baseInfoProps }: AssetCardProps) => (
  <Link href={`/collection/${collectionId}/asset/${id}`}>
    <AssetCardContainer>
      <BaseInfo titleHeadingLevel={3} titleStyleVariant={'h3'} {...baseInfoProps}>
        <BadgeAndTokenIdContainer>
          <Badge />
          {id}
        </BadgeAndTokenIdContainer>
      </BaseInfo>
    </AssetCardContainer>
  </Link>
);
