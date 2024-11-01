import React from "react";
import styled from "styled-components";
import UiBtn from "../uiComponents/UiBtn";

const DelModal = ({ handleCloseModal, name, handleDeleteMember }) => {
  const onDelete = () => {
    handleDeleteMember();
    handleCloseModal();
  };

  return (
    <Wrapper>
      <Modal>
        <Text>
          <Name>{name}</Name>님을 삭제하시겠습니까?
        </Text>
        <BtnBox>
          <UiBtn $bgcolor="#666" onClick={handleCloseModal}>
            아니요
          </UiBtn>
          <UiBtn onClick={onDelete}>삭제하기</UiBtn>
        </BtnBox>
      </Modal>
    </Wrapper>
  );
};

export default DelModal;

// style
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
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
  width: 30%;
  border-radius: 0.25rem;
  background-color: #fff;
`;
const Text = styled.p`
  text-align: center;
`;
const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;
const BtnBox = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
