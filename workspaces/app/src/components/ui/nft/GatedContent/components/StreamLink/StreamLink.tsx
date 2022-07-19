import { css } from '@emotion/react';
import { Link } from 'components/ui';
import { CtaContent, CtaWrapperStyle } from 'components/ui/buttons/variants/CtaButton';
import { GatedStream } from 'libraries/models';
import tokens from 'styles/tokens';
import { useMemo } from 'react';
interface StreamLinkProps {
  streamId: GatedStream['id'];
}

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

export const StreamLink = ({ streamId }: StreamLinkProps) => {
  const isStreamAvailable = useMemo(() => streamId !== null, [streamId]);

  return (
    <Link
      href={isStreamAvailable ? `/stream/${streamId}` : '#'}
      css={getStreamLinkStyle(isStreamAvailable)}
    >
      <CtaContent>{isStreamAvailable ? 'Access Stream' : 'Stream Coming Soon'}</CtaContent>
    </Link>
  );
};
