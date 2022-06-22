import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const getChatTangoConfiguration = (eventId: string) => ({
  handle: eventId,
  arch: 'js',
  styles: {
    a: '1e1e1e',
    b: 100,
    c: 'f0f0f0',
    d: 'f0f0f0',
    e: '1e1e1e',
    g: 'f0f0f0',
    h: 'f0f0f0',
    j: '1e1e1e',
    k: '1e1e1e',
    l: '484848',
    m: '1e1e1e',
    n: 'FFFFFF',
    p: '10',
    q: '1e1e1e',
    r: 100,
    t: 0,
    ab: false,
    sbc: 'f0f0f0',
    surl: 0,
    allowpm: 0,
    cnrs: '0.37',
    fwtickm: 1,
    useonm: 1,
  },
});

const Wrapper = styled.div`
  width: 100%;
`;

interface ChatProps {
  id: string;
}

export const Chat = ({ id }: ChatProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const script = document.createElement('script');
      script.src = '//st.chatango.com/js/gz/emb.js';
      script.id = id;
      script.setAttribute('data-cfasync', 'false');
      script.async = true;
      script.setAttribute('style', 'width:100%; height: 100%');
      script.innerHTML = JSON.stringify(getChatTangoConfiguration('coral-music'));
      ref.current.appendChild(script);
    }
  }, [id]);

  return <Wrapper ref={ref} />;
};
