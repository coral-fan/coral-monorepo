import styled from '@emotion/styled';
import { Heading } from 'components/ui';
import { useIsDesktop } from 'libraries/window';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { FC } from 'react';

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    gap: ${tokens.spacing.desktop.md};
  }
`;

const CollectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${tokens.spacing.mobile.lg};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const ProfileItems: FC = ({ children }) => {
  const isDesktop = useIsDesktop();
  return (
    <ContentContainer>
      {isDesktop && (
        <Heading level={3} styleVariant={'h3'}>
          Collections
        </Heading>
      )}
      <CollectionContainer>{children}</CollectionContainer>
    </ContentContainer>
  );
};
