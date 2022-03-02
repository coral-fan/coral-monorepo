import styled from '@emotion/styled';
import { Detail } from './components';
import tokens from 'styles/tokens';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h4`
  font-size: ${tokens.font.size.md};
  line-height: ${tokens.font.line_height.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  color: ${tokens.font.color.primary};
  font-weight: ${tokens.font.weight.bold};
  text-transform: uppercase;
  padding-bottom: 12px;
`;

export interface DetailsProp {
  details: string[];
}

export const Details = ({ details }: DetailsProp) => {
  return (
    <Container>
      <Heading>Experience Details</Heading>
      {details.map((detail) => (
        <Detail key={detail}>{detail}</Detail>
      ))}
    </Container>
  );
};
