import styled from '@emotion/styled';
import { Avatar } from 'components/ui';
import tokens from 'styles/tokens';
import { Photo } from 'libraries/models';
import { FC } from 'react';

const Container = styled.div`
  display: flex;
  width: fit-content;
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${tokens.border.radius.md};
  align-items: center;
  padding: 3px 12px 3px 3px;
  gap: 8px;
`;

const Info = styled.div`
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  color: ${tokens.font.color.primary};
  font-weight: ${tokens.font.weight.bold};
  text-transform: capitalize;
`;

export interface ImageInfoProps {
  profilePhoto: Photo;
}

export const ImageInfo: FC<ImageInfoProps> = ({ profilePhoto, children }) => (
  <Container>
    <Avatar size={35} {...profilePhoto} />
    <Info>{children}</Info>
  </Container>
);
