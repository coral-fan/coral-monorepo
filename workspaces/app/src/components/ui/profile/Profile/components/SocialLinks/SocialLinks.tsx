import styled from '@emotion/styled';
import { SocialLink, SocialType } from 'components/ui';
import { SocialHandles } from 'libraries/models';
import { DESKTOP_BREAKPOINT } from 'styles';

export const SOCIAL_TYPES: SocialType[] = ['twitter', 'instagram', 'soundcloud'];

const SocialLinkContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    justify-content: start;
  }
`;

export interface SocialLinksProp {
  socialHandles: SocialHandles;
}

export const SocialLinks = ({ socialHandles }: SocialLinksProp) => {
  if (!socialHandles) {
    return null;
  }

  return (
    <SocialLinkContainer>
      {SOCIAL_TYPES.map((socialType) => {
        const usernameInput = socialHandles[socialType];
        if (usernameInput !== undefined && usernameInput !== null) {
          return <SocialLink key={socialType} socialType={socialType} username={usernameInput} />;
        }
      })}
    </SocialLinkContainer>
  );
};
