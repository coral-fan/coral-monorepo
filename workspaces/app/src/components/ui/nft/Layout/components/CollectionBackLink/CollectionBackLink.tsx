import styled from '@emotion/styled';
import { Link } from 'components/ui';
import { Collection } from 'libraries/models';
import tokens from 'styles/tokens';
import { RightArrowHoverIcon } from '../RightArrowHoverIcon';

const Container = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: fit-content;
  text-transform: uppercase;
  font-size: ${tokens.font.size.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  line-height: ${tokens.font.line_height.sm};

  &:hover > svg * {
    stroke: ${tokens.background.color.brand};
  }
`;

interface CollectionBackLinkProps {
  collectionId: Collection['id'];
}
export const CollectionBackLink = ({ collectionId }: CollectionBackLinkProps) => {
  return (
    <Container href={`${window.location.origin}/collection/${collectionId}`}>
      <RightArrowHoverIcon />
      Go to Collection
    </Container>
  );
};
