import styled from '@emotion/styled';
import Script from 'next/script';

const Container = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

interface WebPlayerProps {
  mediaId: string;
}

const JWPLAYER_LIBRARY_URL = 'https://cdn.jwplayer.com/libraries/lja4xTpS.js';

/*
Currently configured to manually broadcast an event stream:
https://developer.jwplayer.com/jwplayer/docs/jw8-manually-broadcast-a-live-event
*/
export const WebPlayer = ({ mediaId }: WebPlayerProps) => {
  const mediaURl = `https://cdn.jwplayer.com/v2/media/${mediaId}`;
  return (
    <>
      <Script
        id="player"
        src={JWPLAYER_LIBRARY_URL}
        onLoad={() => {
          jwplayer('player').setup({
            playlist: [
              {
                file: `${mediaURl}`,
              },
            ],
          });
        }}
      />
      <Container>
        <div id="player"></div>
      </Container>
    </>
  );
};
