import React from "react";
import styled from "styled-components";
import MemberBoard from "./MemberBoard";
import DelToMemberModal from "./DelToMemberModal";

import CrownIcon from "../../icon/crown.svg";
import InputWork from "./InputWork";

const Member = ({
  data,
  setDatas,
  handleLeader,
  handleAddWork,
  handleRemoveWork,
  handleShowModal,
  showDelModal,
  memberToDel,
  handleCloseModal,
  handleDeleteMember,
}) => {
  return (
    <MemberBox>
      <Btn onClick={() => handleShowModal(data)}>제거</Btn>
      <NameBox>
        <Name onClick={() => handleLeader(data.id)}>{data.name}님</Name>
        {data.isLeader && <Icon src={CrownIcon} alt="crown-icon" />}
      </NameBox>
      <InputWork handleAddWork={(work) => handleAddWork(work, data.id)} />
      <MemberBoard
        id={data.id}
        works={data.works}
        handleRemoveWork={handleRemoveWork}
        setDatas={setDatas}
      />

      {showDelModal && (
        <DelToMemberModal
          handleCloseModal={handleCloseModal}
          name={memberToDel.name}
          handleDeleteMember={handleDeleteMember}
        />
      )}
    </MemberBox>
  );
};

export default Member;

// style
const MemberBox = styled.div`
  height: fit-content;
  padding: 2rem 1.5rem 4rem 1.5rem;
  background-color: #f3f7f8;
  border-radius: 0.2rem;
  position: relative;
`;
const NameBox = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Name = styled.h3`
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: #2f4f57;
`;
const Icon = styled.img`
  width: 1rem;
`;
const Btn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  color: #a8a8a8;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;