import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import WorksIcon from "../../icon/wrench.svg";
import CalendarIcon from "../../icon/calendar.svg";

const NavLink = ({ isShowNav }) => {
  return (
    <NavUl>
      <Link to="/">
        <NavLi isShowNav={isShowNav}>
          <Icon src={CalendarIcon} alt="calendar-icon" />
          {/* {isShowNav && "일정 및 공지사항"} */}
          <LiText isShowNav={isShowNav}>일정 및 공지사항</LiText>
        </NavLi>
      </Link>
      <Link to="/work">
        <NavLi isShowNav={isShowNav}>
          <Icon src={WorksIcon} alt="works-icon" />
          {/* {isShowNav && "작업현황"} */}
          <LiText isShowNav={isShowNav}>작업현황</LiText>
        </NavLi>
      </Link>
    </NavUl>
  );
};

export default NavLink;

// style
const NavUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Icon = styled.img`
  width: 1.5rem;
  transition: 0.3s;
  opacity: 0.8;
`;
const NavLi = styled.li`
  padding: ${({ isShowNav }) => (isShowNav ? "1rem" : "1rem 0")};
  border-bottom: ${({ isShowNav }) =>
    isShowNav ? "1px solid #3d778545" : "none"};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    ${Icon} {
      transform: translateY(-2px);
      opacity: 1;
    }
  }
`;
const LiText = styled.p`
  opacity: ${({ isShowNav }) => (isShowNav ? "1" : "0")};
  visibility: ${({ isShowNav }) => (isShowNav ? "visible" : "hidden")};
  height: ${({ isShowNav }) => (isShowNav ? "auto" : "0")};
  max-height: ${({ isShowNav }) => (isShowNav ? "50px" : "0")};
  transition: opacity 0.3s ease, visibility 0s 0.3s, max-height 0.5s ease 0.5s;
  overflow: hidden;
`;
