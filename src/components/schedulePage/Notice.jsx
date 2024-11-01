import React from "react";
import Meeting from "./Meeting";
import Memo from "./Memo";
import styled from "styled-components";
import ScheduleHeader from "./ScheduleHeader";

const Notice = () => {
  return (
    <Wrapper>
      <ScheduleHeader />
      <Div>
        <Meeting />
        <Memo />
      </Div>
    </Wrapper>
  );
};

export default Notice;

// style
const Wrapper = styled.div`
  width: 85vw;
  float: right;
  padding: 0 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Div = styled.div`
  display: flex;
  gap: 2rem;
`;
