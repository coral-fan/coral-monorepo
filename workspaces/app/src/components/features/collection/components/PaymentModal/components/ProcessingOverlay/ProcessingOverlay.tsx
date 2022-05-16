import styled from '@emotion/styled';
import { Spinner } from 'components/ui';
import { Overlay } from 'components/ui/modals/Modal/components';
import tokens from 'styles/tokens';

const Container = styled(Overlay)`
  background: rgba(0, 0, 0, 0.7);
  gap: 30px;
`;

export const ProcessingOverlay = () => (
  <Container>
    <Spinner size={'90px'} color={tokens.background.color.brand} />
    Processing payment...
  </Container>
);
