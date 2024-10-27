import React from "react";
import Members from "../components/workPage/Members";
import styled from "styled-components";

const Works = () => {
  return (
    <Wrapper>
      <Members />
    </Wrapper>
  );
};

export default Works;

// style
const Wrapper = styled.div`
  width: 85vw;
  float: right;
  padding: 0 2rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
