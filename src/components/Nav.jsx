import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  return (
    <NavWrapper>
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
  padding: 3rem 1rem;
  background-color: #f3f7f8;
  position: fixed;
  top: 0;
  left: 0;
`;
const NavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const NavLi = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #3d77858a;
  &:hover {
    border-color: #3d7685;
  }
`;
