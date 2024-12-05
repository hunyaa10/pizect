import React from "react";
import styled from "styled-components";

import LoadingIcon from "../icon/loading-pizza.png";
import { useNav } from "../context/NavContext";

const LoadingData = () => {
  const { isShowNav } = useNav();

  return (
    <Wrapper $isshownav={isShowNav}>
      <Icon src={LoadingIcon} alt="loading-icon" />
    </Wrapper>
  );
};

export default LoadingData;

// style
const Wrapper = styled.div`
  width: ${({ $isshownav }) => ($isshownav ? "85vw" : "96vw")};
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
`;
const Icon = styled.img`
  width: 56px;
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }

  @media (max-width: 1440px) {
    width: 32px;
  }
`;
