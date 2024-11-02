import React from "react";
import styled from "styled-components";
import NavArrow from "./nav/NavArrow";
import NavLink from "./nav/NavLink";
import { useNav } from "../NavContext";

const Nav = () => {
  const { isShowNav, handleHideNav, handleShowNav } = useNav();

  return (
    <NavWrapper $isshownav={isShowNav}>
      <NavArrow
        isShowNav={isShowNav}
        handleHideNav={handleHideNav}
        handleShowNav={handleShowNav}
      />
      {isShowNav ? <Logo>PIZECT.</Logo> : <Logo>P</Logo>}
      <NavLink isShowNav={isShowNav} />
    </NavWrapper>
  );
};

export default Nav;

// style
const NavWrapper = styled.nav`
  width: ${({ $isshownav }) => ($isshownav ? "15vw" : "56px")};
  height: 100vh;
  padding: 1rem;
  background-color: #f3f7f8;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.5s;
`;
const Logo = styled.h1`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #3d7685;
`;
