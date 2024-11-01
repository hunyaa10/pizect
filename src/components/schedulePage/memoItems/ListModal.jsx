import React, { useState } from "react";
import styled from "styled-components";
import UiBtn from "../../uiComponents/UiBtn";
import ListModalTitle from "./ListModalTitle";
import ListModalScript from "./ListModalScript";
import ListModalTop from "./ListModalTop";

const ListModal = ({ handleCloseModal, title, script, handleUpdateMemo }) => {
  const [isChangeInput, setIsChangeInput] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newScript, setNewScript] = useState(script);

  const handleSaveChangeMemo = () => {
    handleUpdateMemo(newTitle, newScript);
    handleCloseModal();
  };

  return (
    <Wrapper onClick={handleCloseModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ListModalTop
          isChangeInput={isChangeInput}
          setIsChangeInput={setIsChangeInput}
          handleCloseModal={handleCloseModal}
        />
        <ListModalTitle
          isChangeInput={isChangeInput}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          title={title}
        />
        <ListModalScript
          isChangeInput={isChangeInput}
          newScript={newScript}
          setNewScript={setNewScript}
          script={script}
        />
        {isChangeInput && (
          <BtnBox>
            <UiBtn onClick={handleSaveChangeMemo}>수정하기</UiBtn>
          </BtnBox>
        )}
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
  height: 60%;
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
const BtnBox = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;
