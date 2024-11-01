import React from "react";
import styled from "styled-components";

const ScheduleHeader = () => {
  return (
    <Header>
      <Logo>PIZECT.</Logo>
      <PjTitle>RUNTO_런토</PjTitle>
    </Header>
  );
};

export default ScheduleHeader;

// style
const Header = styled.header`
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #3d7685;
  opacity: 0;
`;
const PjTitle = styled.h2`
  font-size: 1.5rem;
  color: #3d7685;
`;
