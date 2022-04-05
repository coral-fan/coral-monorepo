import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';

const { layout, spacing, buttons, font, border } = tokens;
const { desktop, mobile } = layout.padding;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.mobile.lg};
  margin-top: calc(-1 * ((2 * ${desktop.vertical}) + ${buttons.size.desktop}));

  @media ${QUERY.TABLET} {
    display: flex;
    flex-direction: row;
    gap: ${spacing.mobile.xl};
  }
`;

export const ImageWrapper = styled.div`
  margin-left: calc(-1 * ${mobile.horizontal});
  margin-right: calc(-1 * ${mobile.horizontal});

  @media ${QUERY.TABLET} {
    flex: 1 0 56%;
    align-self: flex-start;
    position: sticky;
    margin-right: 0;
    top: 0;
  }

  @media ${QUERY.LAPTOP} {
    margin-left: calc(-1 * ${desktop.horizontal});
    flex: 1 0 48%;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.mobile.lg};

  @media ${QUERY.TABLET} {
    margin-top: calc((${desktop.vertical}) + ${buttons.size.desktop});
  }
`;

export const AvailableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.mobile.lg};
  border-bottom: solid 1px ${border.color.secondary};
  padding-bottom: ${spacing.mobile.xl};
`;
