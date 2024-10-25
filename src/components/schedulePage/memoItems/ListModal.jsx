import React from "react";
import styled from "styled-components";
import CloseIcon from "../../../icon/x-icon.svg";

const ListModal = ({ handleCloseModal, title, script }) => {
  return (
    <Wrapper onClick={handleCloseModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={handleCloseModal}>
          <Icon src={CloseIcon} alt="x-icon" />
        </CloseBtn>
        <Title>{title}</Title>
        <Script>{script}</Script>
      </Modal>
    </Wrapper>
  );
};

export default ListModal;

// style
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  padding: 1rem;
  width: 50%;
  height: 50%;
  background-color: #fff;
  border-radius: 0.25rem;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.8rem;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0 0.25rem 0.25rem 0;
    overflow: hidden;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 0.25rem;
  }
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.img`
  width: 24px;
`;
const Title = styled.h3`
  width: 100%;
  padding-bottom: 0.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ececec;
`;
const Script = styled.p`
  padding: 0 1rem;
  letter-spacing: 1px;
  line-height: 1.8;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;
