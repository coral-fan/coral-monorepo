import styled from '@emotion/styled';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

const { size, line_height, letter_spacing, weight, color } = tokens.font;
const { mobile, desktop } = tokens.spacing;

const verticalSpacerDesktop = desktop.lg;
const verticalSpacerMobile = mobile.lg;

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${verticalSpacerMobile};
  align-items: center;
  /* border: solid 1px red; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    align-items: flex-start;
    flex-direction: row;
    gap: ${verticalSpacerDesktop};
  }
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${verticalSpacerMobile};
  flex: 1 0 42.5%;
  /* border: solid 1px blue; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    gap: ${verticalSpacerDesktop};
    position: sticky;
    top: 100px;
  }
`;

export const MainProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${verticalSpacerMobile};
  /* border: solid 1px yellow; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    gap: ${desktop.md};
    flex-direction: row;
  }
`;

export const AvatarContainer = styled.div`
  width: fit-content;
  position: relative;
`;

export const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    align-items: flex-start;
  }
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

export const Quote = styled.q`
  color: ${color.secondary};
  font-size: ${size.lg};
  letter-spacing: ${letter_spacing.lg};
  line-height: ${line_height.lg};
  font-weight: ${weight.bold};
  /* border: solid 1px white; */
`;

export const UserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.md};
  text-align: left;
  /* border: solid 1px purple; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    gap: ${tokens.spacing.desktop.md};
  }
`;
