import React from "react";
import styled from "styled-components";

import RightArrowIcon from "../../icon/double-right.svg";
import LeftArrowIcon from "../../icon/double-left.svg";

const NavArrow = ({ isShowNav, handleHideNav, handleShowNav }) => {
  return (
    <BtnWrapper>
      <ArrowBtn>
        {isShowNav ? (
          <ArrowIcon
            src={LeftArrowIcon}
            alt="leftarrow-icon"
            onClick={handleHideNav}
          />
        ) : (
          <ArrowIcon
            src={RightArrowIcon}
            alt="rightarrow-icon"
            onClick={handleShowNav}
          />
        )}
      </ArrowBtn>
    </BtnWrapper>
  );
};

export default NavArrow;

// style
const BtnWrapper = styled.div`
  position: relative;
`;
const ArrowBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;
const ArrowIcon = styled.img`
  width: 1.3rem;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
