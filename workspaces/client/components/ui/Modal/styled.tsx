import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ContainerProps {
  width?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 50%;
`;
