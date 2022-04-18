import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SocialLinks } from 'components/ui';
import { SocialHandles } from 'libraries/models';
import { FC } from 'react';

const CORAL_SOCIAL_HANDLES: SocialHandles = {
  instagram: 'coral_fan',
  twitter: 'coral__fan',
};

export const CoralSocialLinks = () => <SocialLinks socialHandles={CORAL_SOCIAL_HANDLES} />;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const LayoutContainer = styled.div`
  ${containerStyle}
  gap: 20px;
`;

export const CtaLayout: FC = ({ children }) => (
  <LayoutContainer>
    {children}
    <CoralSocialLinks />
  </LayoutContainer>
);
