import styled from 'styled-components';

export const ErrorImageOverlay = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
    /* background-color: #152129; */
  justify-content: center;
  align-items: center;
`;

export const ErrorImageContainer = styled.div`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
`;

export const ErrorImageText = styled.h2`
  font-size: 28px;
  color: #2f8e89;
`;
