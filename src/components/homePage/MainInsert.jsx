import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import UiBtn from "../uiComponents/UiBtn";

const MainInsert = () => {
  const { userData } = useAuth();
  // console.log(userData);
  return (
    <Wrapper>
      <Inner>
        <Logo>PIZECT.</Logo>
        <Text>
          <UserName>{userData?.displayName}</UserName>님, 환영합니다!
        </Text>
        <Link to="/schedule">
          <UiBtn padding="0.5rem 1rem" fontSize="1.2rem">
            런토프로젝트 보러가기
          </UiBtn>
        </Link>
      </Inner>
    </Wrapper>
  );
};

export default MainInsert;

// style
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #3d7685;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Inner = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 2rem;
  background-color: #f3f7f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #3d7685;
`;
const Text = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
`;
const UserName = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: #3d7685;
`;
