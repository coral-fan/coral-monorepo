import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';
import { Heading } from 'components/ui';
import tokens from 'styles/tokens';
import { ImageWithInfo, ImageWithInfoProps } from '..';

export interface BaseProps extends ImageWithInfoProps {
  name: string;
  Badge: () => EmotionJSX.Element;
  description?: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Description = styled.p`
  font-size: ${tokens.font.size.md};
  line-height: ${tokens.font.line_height.md};
`;

export const InfoBase = ({ name, Badge, description, ...imageWithInfoProps }: BaseProps) => (
  <Container>
    <ImageWithInfo {...imageWithInfoProps} />
    <Heading level={1}>{name}</Heading>
    <Badge />
    {description && <Description>{description}</Description>}
  </Container>
);
