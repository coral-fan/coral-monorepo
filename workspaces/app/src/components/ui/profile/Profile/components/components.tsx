import styled from '@emotion/styled';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

const { size, line_height, letter_spacing, weight } = tokens.font;
const { mobile, desktop } = tokens.spacing;

const horizontalSpacerDesktop = desktop.lg;
const horizontalSpacerMobile = mobile.lg;

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  --gap: ${horizontalSpacerMobile};
  /* border: solid 1px red; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    align-items: flex-start;
    flex-direction: row;
    --gap: ${horizontalSpacerDesktop};
  }
  gap: var(--gap);
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 0 42.5%;
  --gap: ${horizontalSpacerMobile};
  /* border: solid 1px blue; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    position: sticky;
    top: 128px;
  }
  gap: var(--gap);
`;

export const MainProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  --gap: ${horizontalSpacerMobile};
  /* border: solid 1px yellow; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    flex-direction: row;
    --gap: ${desktop.md};
  }
  gap: var(--gap);
`;

export const AvatarContainer = styled.div`
  width: fit-content;
  position: relative;
`;

export const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  --align-items: center;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    --align-items: flex-start;
  }
  align-items: var(--align-items);
`;

export const Username = styled.span`
  font-size: ${size.xl};
  letter-spacing: ${letter_spacing.xl};
  line-height: ${line_height.xl};
  font-weight: ${weight.bold};
`;

export const Bio = styled.p`
  font-size: ${size.sm};
  letter-spacing: ${letter_spacing.sm};
  line-height: ${line_height.sm};
  font-weight: ${weight.normal};
  /* border: solid 1px white; */
`;

export const UserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  --gap: ${tokens.spacing.mobile.md};
  /* border: solid 1px purple; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    --gap: ${tokens.spacing.desktop.md};
  }
  gap: var(--gap);
`;
