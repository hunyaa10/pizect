import React from "react";
import styled from "styled-components";
import NavArrow from "./NavArrow";
import NavLink from "./NavLink";
import { useNav } from "../../context/NavContext";
import LogoutForm from "./LogoutForm";

import LogoIcon from "../../icon/logo.svg";
import LogoPIcon from "../../icon/logo_p.svg";

const Nav = () => {
  const { isShowNav, handleHideNav, handleShowNav } = useNav();

  return (
    <NavWrapper $isshownav={isShowNav}>
      <NavArrow
        isShowNav={isShowNav}
        handleHideNav={handleHideNav}
        handleShowNav={handleShowNav}
      />
      {isShowNav ? (
        <Logo src={LogoIcon} alt="logo" />
      ) : (
        <LogoP src={LogoPIcon} alt="logo-p" />
      )}
      <NavLink isShowNav={isShowNav} />
      <LogoutBox>
        <LogoutForm />
      </LogoutBox>
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
const Logo = styled.img`
  margin: 4rem auto;
  width: 180px;

  @media (max-width: 1440px) {
    margin: 3rem auto;
    width: 120px;
  }
`;
const LogoP = styled(Logo)`
  width: 20px;
`;
const LogoutBox = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;
