import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

import GoogleIcon from "../../icon/google.svg";

const LoginForm = () => {
  const { handleGoogleLogin } = useAuth();

  return (
    <Wrapper>
      <TextBox>
        팀프로젝트 소통을 위한 소셜사이트
        <Logo>PIZECT.</Logo>
      </TextBox>
      <GoogleLoginBtn onClick={handleGoogleLogin}>
        <Icon src={GoogleIcon} alt="google-icon" />
        구글로그인하기
      </GoogleLoginBtn>
      <ScriptBox>
        파이어베이스를 공부하면서 만든 개인프로젝트입니다.
        <br />
        개발자 : 하수현
        <br />
        이메일 : hunyaa10@gmail.com
      </ScriptBox>
    </Wrapper>
  );
};

export default LoginForm;

// style
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #3d7685;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.div`
  margin-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: #f3f7f8;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;
const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
`;

const Icon = styled.img`
  width: 32px;
  transition: 0.5s;
`;
const GoogleLoginBtn = styled.button`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: #f3f7f8;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    ${Icon} {
      transform: translateY(-4px);
    }
  }
`;

const ScriptBox = styled.div`
  margin-top: 5rem;
  color: #f3f7f8;
  line-height: 1.7;
  text-align: center;
  font-size: 1.2rem;
`;
