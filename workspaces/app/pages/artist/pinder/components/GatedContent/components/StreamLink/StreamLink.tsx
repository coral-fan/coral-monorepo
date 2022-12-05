import { css } from '@emotion/react';
import { Link } from 'components/ui';
import { CtaContent, CtaWrapperStyle } from 'components/ui/buttons/variants/CtaButton';
import { GatedContent } from 'libraries/models';
import tokens from 'styles/tokens';
import { useMemo } from 'react';

const getStreamLinkStyle = (isStreamAvailable: boolean) => css`
  ${CtaWrapperStyle};
  display: block;
  width: 100%;
  padding: 36px 20px;
  border-top: dashed ${tokens.background.color.secondary} 3px;
  margin-top: calc(-1 * ${tokens.spacing.mobile.lg});

  ${isStreamAvailable
    ? css`
        &:hover {
          filter: brightness(0.9);
        }
      `
    : css`
        pointer-events: none;
        filter: opacity(0.75);
      `}
`;

export const StreamLink = ({ value }: Omit<GatedContent, 'type'>) => {
  const isStreamAvailable = useMemo(() => value !== null, [value]);

  return (
    <Link
      href={isStreamAvailable ? `/stream/${value}` : '#'}
      css={getStreamLinkStyle(isStreamAvailable)}
    >
      <CtaContent>{isStreamAvailable ? 'Access Stream' : 'Stream Coming Soon'}</CtaContent>
    </Link>
  );
};
