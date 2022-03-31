import styled from '@emotion/styled';
import tokens, { QUERIES } from 'styles/tokens';

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

  @media ${QUERIES.tabletAndUp} {
    align-items: flex-start;
    flex-direction: row;
  }

  @media ${QUERIES.laptopAndUp} {
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

  @media ${QUERIES.tabletAndUp} {
    position: sticky;
    top: calc((2 * ${tokens.layout.padding.desktop.vertical}) + ${tokens.buttons.size.desktop});
  }
  gap: var(--gap);
`;

export const MainProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  --gap: ${horizontalSpacerMobile};

  @media ${QUERIES.tabletAndUp} {
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

  @media ${QUERIES.tabletAndUp} {
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
`;

export const UserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  --gap: ${tokens.spacing.mobile.md};

  @media ${QUERIES.tabletAndUp} {
    --gap: ${tokens.spacing.desktop.md};
  }
  gap: var(--gap);
`;
