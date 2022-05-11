import styled from '@emotion/styled';
import { Heading } from 'components/ui';
import { useIsMobile } from 'libraries/window';
import tokens, { QUERY } from 'styles/tokens';
import { FadeInAnimation } from 'libraries/animation';
import { ReactNode } from 'react';
import { Spinner } from 'components/ui/Spinner/Spinner';

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.lg};

  @media ${QUERY.LAPTOP} {
    gap: ${tokens.spacing.desktop.md};
  }
`;

const CollectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${tokens.spacing.mobile.lg};

  @media ${QUERY.TABLET} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

interface SpinnerContainerProp {
  isLoading: boolean;
}
const SpinnerContainer = styled.div<SpinnerContainerProp>`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: ${({ isLoading }) => (isLoading ? '40px' : 0)} 0;
`;

interface ProfileItemsProps {
  isLoading: boolean;
  children: ReactNode;
}

export const ProfileItems = ({ isLoading, children }: ProfileItemsProps) => {
  const isMobile = useIsMobile();

  return (
    <ContentContainer>
      {!isMobile && (
        <Heading level={3} styleVariant={'h3'}>
          Collections
        </Heading>
      )}
      <SpinnerContainer isLoading={isLoading}>
        <Spinner size={'100px'} color={tokens.border.color.brand} />
      </SpinnerContainer>
      <FadeInAnimation isLoading={isLoading}>
        <CollectionContainer>{children}</CollectionContainer>
      </FadeInAnimation>
    </ContentContainer>
  );
};
