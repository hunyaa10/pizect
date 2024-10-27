import React, { useEffect, useState } from "react";
import { workData } from "../../data/worksData";
import useDragSensors from "../../hooks/useDragSensors";
import styled from "styled-components";
import { closestCorners, DndContext } from "@dnd-kit/core";
import MemberBoard from "./MemberBoard";
import InputWork from "./InputWork";
import MemberHeader from "./MemberHeader";

import CrownIcon from "../../icon/crown.svg";
import DelModal from "./DelModal";

const Members = () => {
  const [datas, setDatas] = useState([]);
  const [leaderId, setLeaderId] = useState(1);
  const [showDelModal, setShowDelModal] = useState(false);
  const [memberToDel, setMemberToDel] = useState(null);

  useEffect(() => {
    setDatas(workData);
  }, []);
  // console.log(datas);

  const names = datas.map((data) => data.name);

  // 팀장변경
  const handleLeader = (id) => {
    setLeaderId((prevId) => (prevId === id ? null : id));
  };

  // 작업추가
  const handleAddWork = (work, memberId) => {
    if (work.trim()) {
      setDatas((prev) =>
        prev.map((data) => {
          if (data.id === memberId) {
            const newWork = {
              id: `w${data.works.length + 1}`,
              work: work,
            };
            return {
              ...data,
              works: [newWork, ...data.works],
            };
          }
          return data;
        })
      );
    }
  };

  // 작업삭제
  const handleRemoveWork = (memberId, listId) => {
    setDatas((prev) =>
      prev.map((data) => {
        if (data.id === memberId) {
          return {
            ...data,
            works: data.works.filter((work) => work.id !== listId),
          };
        }
        return data;
      })
    );
  };

  // 팀원추가
  const handleAddMember = (name) => {
    if (name.trim()) {
      const newMember = {
        id: datas.length + 1,
        name: name,
        works: [],
      };

      setDatas((prev) => [...prev, newMember]);
    }
  };

  // 팀원삭제모달창
  const handleShowModal = (member) => {
    setMemberToDel(member);
    setShowDelModal(true);
  };
  const handleCloseModal = () => {
    setShowDelModal(false);
  };
  // 팀원삭제
  const handleDeleteMember = () => {
    setDatas((prev) => prev.filter((member) => member.id !== memberToDel.id));
    setMemberToDel(null);
  };

  // 드래그앤드롭
  const sensors = useDragSensors();

  const handleDragEnd = (event, memberId) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const member = datas.find((data) => data.id === memberId);
    const oldIndex = member.works.findIndex((work) => work.id === active.id);
    const newIndex = member.works.findIndex((work) => work.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newWorks = [...member.works];
      const [movedItem] = newWorks.splice(oldIndex, 1);
      newWorks.splice(newIndex, 0, movedItem);

      setDatas((prev) =>
        prev.map((data) => {
          if (data.id === memberId) {
            return { ...data, works: newWorks };
          }
          return data;
        })
      );
    }
  };

  return (
    <>
      <MemberHeader names={names} handleAddMember={handleAddMember} />
      <Container>
        {datas.map((data) => (
          <DndContext
            key={data.id}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={(e) => handleDragEnd(e, data.id)}
          >
            <MemberBox>
              <NameBox>
                <Name onClick={() => handleLeader(data.id)}>{data.name}님</Name>
                {leaderId === data.id || (data.id === 1 && leaderId === 1) ? (
                  <Icon src={CrownIcon} alt="crown-icon" />
                ) : null}
              </NameBox>
              <InputWork
                handleAddWork={(work) => handleAddWork(work, data.id)}
              />
              <MemberBoard
                memberId={data.id}
                works={data.works}
                handleRemoveWork={handleRemoveWork}
              />
              <Btn onClick={() => handleShowModal(data)}>제거</Btn>
              {showDelModal && (
                <DelModal
                  handleCloseModal={handleCloseModal}
                  name={memberToDel.name}
                  handleDeleteMember={handleDeleteMember}
                />
              )}
            </MemberBox>
          </DndContext>
        ))}
      </Container>
    </>
  );
};

export default Members;

// style
const Container = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;
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
