import styled from '@emotion/styled';
import { Heading, HeadingLevel } from 'components/ui/Heading';
import { ImageWithInfo, ImageWithInfoProps } from '..';

export interface BaseProps extends ImageWithInfoProps {
  dropName: string;
  nameHeadingLevel: HeadingLevel;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// const Description = styled.p`
//   font-size: ${tokens.font.size.md};
//   line-height: ${tokens.font.line_height.md};
// `;

export const InfoBase = ({ dropName, nameHeadingLevel, ...imageWithInfoProps }: BaseProps) => (
  <Container>
    <ImageWithInfo {...imageWithInfoProps} />
    <Heading level={nameHeadingLevel}>{dropName}</Heading>
  </Container>
);
