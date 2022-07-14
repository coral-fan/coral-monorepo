import styled from '@emotion/styled';
import { Avatar } from 'components/ui';
import tokens, { QUERY } from 'styles/tokens';
import { Photo } from 'libraries/models';
import { ComponentPropsWithRef, forwardRef } from 'react';

const Container = styled.div`
  display: flex;
  width: max-content;
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${tokens.border.radius.md};
  align-items: center;
  padding: 3px 6px 3px 4px;
  gap: 4px;

  @media ${QUERY.TABLET} {
    gap: 8px;
    padding: 3px 9px 3px 6px;
  }
`;

const Info = styled.div`
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  color: ${tokens.font.color.primary};
  font-weight: ${tokens.font.weight.bold};
  text-transform: capitalize;

  @media ${QUERY.TABLET} {
    font-size: ${tokens.font.size.sm};
    line-height: ${tokens.font.line_height.sm};
    letter-spacing: ${tokens.font.letter_spacing.sm};
  }
`;

export interface ArtistInfoProps extends ComponentPropsWithRef<'div'> {
  profilePhoto: Photo;
}

export const CreatorInfo = forwardRef<HTMLDivElement, ArtistInfoProps>(function ImageInfo(
  { profilePhoto, children },
  ref
) {
  return (
    <Container ref={ref}>
      <Avatar size={35} {...profilePhoto} />
      <Info>{children}</Info>
    </Container>
  );
});
