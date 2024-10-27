import React from "react";
import Meeting from "./Meeting";
import Memo from "./Memo";
import styled from "styled-components";

const Notice = () => {
  return (
    <Wrapper>
      <Meeting />
      <Memo />
    </Wrapper>
  );
};

export default Notice;

// style
const Wrapper = styled.div`
  width: 85vw;
  float: right;
  padding: 10vh 2rem 0 2rem;
  display: flex;
  gap: 2rem;
`;
