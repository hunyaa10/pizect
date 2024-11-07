import React from "react";
import Members from "../components/workPage/Members";
import styled from "styled-components";
import { useNav } from "../context/NavContext";

const Works = () => {
  const { isShowNav } = useNav();

  return (
    <Wrapper $isshownav={isShowNav}>
      <Members />
    </Wrapper>
  );
};

export default Works;

// style
const Wrapper = styled.div`
  width: ${({ $isshownav }) => ($isshownav ? "85vw" : "96vw")};
  float: right;
  padding: 0 2rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: 0.5s;
`;
