import styled from '@emotion/styled';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

const { size, line_height, letter_spacing, weight } = tokens.font;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 16px;
`;

export const MainProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    flex-direction: row;
    gap: 30px;
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

export const Bio = styled.div`
  font-size: ${size.sm};
  letter-spacing: ${letter_spacing.sm};
  line-height: ${line_height.sm};
  font-weight: ${weight.normal};
`;

export const UserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
