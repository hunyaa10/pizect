import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  return (
    <NavWrapper>
      <Logo>PIZECT.</Logo>
      <NavUl>
        <Link to="/">
          <NavLi>일정 및 공지사항</NavLi>
        </Link>
        <Link to="/work">
          <NavLi>작업현황</NavLi>
        </Link>
      </NavUl>
    </NavWrapper>
  );
};

export default Nav;

// style
const NavWrapper = styled.nav`
  width: 15vw;
  height: 100vh;
  padding: 2rem 1rem;
  background-color: #f3f7f8;
  position: fixed;
  top: 0;
  left: 0;
`;
const Logo = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #3d7685;
`;
const NavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const NavLi = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #3d77858a;
  font-size: 0.9rem;
  font-weight: 500;
  &:hover {
    border-color: #3d7685;
  }
`;
