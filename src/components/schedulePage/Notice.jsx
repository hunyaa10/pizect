import React from "react";
import Meeting from "./Meeting";
import Memo from "./Memo";
import styled from "styled-components";
import ScheduleHeader from "./ScheduleHeader";
import { useNav } from "../../NavContext";

const Notice = () => {
  const { isShowNav } = useNav();

  return (
    <Wrapper $isshownav={isShowNav}>
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
  width: ${({ $isshownav }) => ($isshownav ? "85vw" : "96vw")};
  float: right;
  padding: 0 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: 0.5s;
`;
const Div = styled.div`
  display: flex;
  gap: 2rem;
`;
