import styled from '@emotion/styled';
import { Heading } from 'components/ui';
import { useIsMobile } from 'libraries/window';
import tokens, { QUERY } from 'styles/tokens';
import { ReactNode } from 'react';

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
interface ProfileItemsProps {
  children: ReactNode;
}

export const ProfileItems = ({ children }: ProfileItemsProps) => {
  const isMobile = useIsMobile();

  return (
    <ContentContainer>
      {!isMobile && (
        <Heading level={3} styleVariant={'h3'}>
          Collections
        </Heading>
      )}
      <CollectionContainer>{children}</CollectionContainer>
    </ContentContainer>
  );
};
