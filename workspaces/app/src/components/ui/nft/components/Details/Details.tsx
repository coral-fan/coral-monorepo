import styled from '@emotion/styled';
import { Detail } from './components';
import { Heading as HeadingComponent } from 'components/ui';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Heading = styled(HeadingComponent)`
  text-transform: uppercase;
  padding-bottom: 12px;
`;

export interface DetailsProp {
  details: string[];
}

export const Details = ({ details }: DetailsProp) => {
  return (
    <Container>
      <Heading level={2} styleVariant={'h4'}>
        Experience Details
      </Heading>
      {details.map((detail) => (
        <Detail key={detail}>{detail}</Detail>
      ))}
    </Container>
  );
};
