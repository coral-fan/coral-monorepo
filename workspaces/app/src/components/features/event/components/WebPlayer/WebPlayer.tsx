import styled from '@emotion/styled';

const Container = styled.div`
  width: 66%;
  margin: auto;
`;

const PlayerContainer = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
`;

const Player = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

interface WebPlayerProps {
  mediaId: string;
}

export const WebPlayer = ({ mediaId }: WebPlayerProps) => {
  return (
    <>
      <Container>
        <PlayerContainer>
          <Player
            src={`https://videos.sproutvideo.com/embed/${mediaId}`}
            frameBorder="0"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></Player>
        </PlayerContainer>
      </Container>
    </>
  );
};
