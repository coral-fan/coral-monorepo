import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';

const { layout, spacing, buttons, border } = tokens;
const { desktop, mobile } = layout.padding;

interface AssetDisplayProps {
  isAsset: boolean;
}

export const Container = styled.div<AssetDisplayProps>`
  width: 100%;
  display: flex;
  flex-direction: column;

  /*
    Moves image behind navigation bar in mobile when
    rendering Collection.
  */
  ${({ isAsset }) =>
    !isAsset &&
    css`
      margin-top: calc(-1 * ((2 * ${desktop.vertical}) + ${buttons.size.desktop}));
    `}

  @media ${QUERY.TABLET} {
    display: flex;
    flex-direction: row;
    gap: ${spacing.mobile.lg};

    /*
      Move image behind navigation bar in desktop when
      rendering Asset.
    */
    ${({ isAsset }) =>
      isAsset &&
      css`
        margin-top: calc(-1 * ((2 * ${desktop.vertical}) + ${buttons.size.desktop}));
      `}
  }
`;

export const ImageWrapper = styled.div<AssetDisplayProps>`
  width: 100%;

  @media ${QUERY.TABLET} {
    flex: 1 0 52%;
    align-self: flex-start;
    position: sticky;
    margin-right: 0;
    top: 0;
    margin-left: calc(-1 * ${mobile.horizontal});
  }

  @media ${QUERY.LAPTOP} {
    margin-left: calc(-1 * ${desktop.horizontal});
    flex: 1 0 48%;
  }
`;

export const ContentContainer = styled.div<AssetDisplayProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.mobile.lg};

  @media ${QUERY.TABLET} {
    margin-top: calc((${desktop.vertical}) + ${buttons.size.desktop});
    ${({ isAsset }) =>
      isAsset &&
      css`
        padding-top: ${tokens.spacing.desktop.md};
      `}
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

export const NftAssetContainer = styled.div<AssetDisplayProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;

  /*
    Asset content has distinct background color
    and border radius.
  */
  ${({ isAsset }) =>
    isAsset &&
    css`
      background: ${tokens.background.color.secondary};
      border-radius: ${tokens.border.radius.lg};
    `}

  /*
    Since image is inside this container on mobile, the Collection
    image needs to fill the screen.
  */
  ${({ isAsset }) =>
    !isAsset &&
    css`
      margin-left: calc(-1 * ${mobile.horizontal});
      margin-right: calc(-1 * ${mobile.horizontal});
    `}

  /*
    Revert above on desktop
  */
  @media ${QUERY.TABLET} {
    margin: 0;
  }
`;

export const GatedContentWrapper = styled.div`
  margin-top: calc(-1 * ${spacing.mobile.lg});
`;

export const AssetContentContainer = styled.div<AssetDisplayProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.mobile.lg};
  padding: ${({ isAsset }) =>
    isAsset
      ? `${tokens.layout.padding.mobile.horizontal}`
      : `0px ${tokens.layout.padding.mobile.horizontal}`};
  background-color: 'transparent';

  @media ${QUERY.TABLET} {
    padding: ${({ isAsset }) => (isAsset ? `${tokens.layout.padding.mobile.horizontal}` : '0px')};
  }
`;
