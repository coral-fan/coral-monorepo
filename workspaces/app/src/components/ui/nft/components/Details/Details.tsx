import styled from '@emotion/styled';
import { Detail } from './components';
import { Heading } from 'components/ui';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export interface DetailsProp {
  details: string[];
}

export const Details = ({ details }: DetailsProp) => {
  return (
    <Container>
      <div>
        <Heading level={2} styleVariant={'h4'}>
          Details
        </Heading>
      </div>
      <div>
        {details.map((detail) => (
          <Detail key={detail}>{detail}</Detail>
        ))}
      </div>
    </Container>
  );
};
