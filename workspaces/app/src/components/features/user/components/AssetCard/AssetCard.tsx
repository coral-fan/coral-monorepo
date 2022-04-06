import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { Card } from 'components/ui/Card';
import { BaseInfo, BaseInfoProps } from 'components/ui';
import { Asset } from 'libraries/models';

export interface AssetCardProps
  extends Omit<BaseInfoProps, 'titleHeadingLevel' | 'titleStyleVariant'>,
    Pick<Asset, 'id' | 'contractAddress'> {
  Badge: () => EmotionJSX.Element;
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

export const AssetCard = ({ Badge, contractAddress, id, ...baseInfoProps }: AssetCardProps) => (
  <Link href={`/collection/${contractAddress}/asset/${id}`}>
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
