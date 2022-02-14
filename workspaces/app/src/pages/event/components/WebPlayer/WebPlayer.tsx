import styled from '@emotion/styled';
import Script from 'next/script';

const Container = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

interface WebPlayerProps {
  url: string;
}

const JWPLAYER_LIBRARY_URL = 'https://cdn.jwplayer.com/libraries/lja4xTpS.js';

export const WebPlayer = ({ url }: WebPlayerProps) => {
  return (
    <>
      <Script
        id="myElement"
        src={JWPLAYER_LIBRARY_URL}
        onLoad={() => {
          jwplayer('myElement').setup({
            playlist: [
              {
                file: `${url}`,
              },
            ],
          });
        }}
      />
      <Container>
        <div id="myElement"></div>
      </Container>
    </>
  );
};
