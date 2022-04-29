import styled from '@emotion/styled';
import { SocialLinks } from 'components/ui';
import { SocialHandles } from 'libraries/models';
import { QUERY } from 'styles';

export const Heading = styled.h1`
  --font-size: 34px;

  @media ${QUERY.TABLET} {
    --font-size: 52px;
  }

  font-size: var(--font-size);
  padding-bottom: 4px;

  max-width: 1000px;
  text-align: center;
`;

const CORAL_SOCIAL_HANDLES: SocialHandles = {
  instagram: 'coral_fan',
  twitter: 'coral__fan',
};

export const CoralSocialLinks = () => <SocialLinks socialHandles={CORAL_SOCIAL_HANDLES} />;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  gap: 20px;
`;
