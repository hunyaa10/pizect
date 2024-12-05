import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import WorksIcon from "../../icon/wrench.svg";
import CalendarIcon from "../../icon/calendar.svg";

const NavLink = ({ isShowNav }) => {
  return (
    <NavUl>
      <Link to="/schedule">
        <NavLi $isshownav={isShowNav}>
          <Icon src={CalendarIcon} alt="calendar-icon" />
          <LiText $isshownav={isShowNav}>일정 및 공지사항</LiText>
        </NavLi>
      </Link>
      <Link to="/work">
        <NavLi $isshownav={isShowNav}>
          <Icon src={WorksIcon} alt="works-icon" />
          <LiText $isshownav={isShowNav}>작업현황</LiText>
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
  width: 2rem;
  transition: 0.3s;
  opacity: 0.8;

  @media (max-width: 1440px) {
    width: 1.5rem;
  }
`;
const NavLi = styled.li`
  padding: ${({ $isshownav }) => ($isshownav ? "1rem" : "1rem 0")};
  border-bottom: ${({ $isshownav }) =>
    $isshownav ? "1px solid #3d778545" : "none"};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;

  &:hover {
    ${Icon} {
      transform: translateY(-2px);
      opacity: 1;
    }
  }

  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
const LiText = styled.p`
  opacity: ${({ $isshownav }) => ($isshownav ? "1" : "0")};
  visibility: ${({ $isshownav }) => ($isshownav ? "visible" : "hidden")};
  height: ${({ $isshownav }) => ($isshownav ? "auto" : "0")};
  max-height: ${({ $isshownav }) => ($isshownav ? "50px" : "0")};
  transition: opacity 0.3s ease, visibility 0s 0.3s, max-height 0.5s ease 0.5s;
  overflow: hidden;
`;
