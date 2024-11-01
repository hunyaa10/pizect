import React from "react";
import styled from "styled-components";
import CloseIcon from "../../../icon/x-icon.svg";

const ListModalTop = ({
  isChangeInput,
  setIsChangeInput,
  handleCloseModal,
}) => {
  return (
    <TopBtnBox>
      <ModifyBtn
        onClick={() => setIsChangeInput(true)}
        $isChangeInput={isChangeInput}
      >
        수정
      </ModifyBtn>
      <CloseBtn onClick={handleCloseModal}>
        <Icon src={CloseIcon} alt="x-icon" />
      </CloseBtn>
    </TopBtnBox>
  );
};

export default ListModalTop;

// style
const TopBtnBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ModifyBtn = styled.button`
  visibility: ${({ $isChangeInput }) =>
    $isChangeInput ? "hidden" : "visible"};
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const CloseBtn = styled.button`
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.img`
  width: 24px;
`;
