import React, { useEffect, useState } from "react";
import useDragSensors from "../../hooks/useDragSensors";
import styled from "styled-components";
import { closestCorners, DndContext } from "@dnd-kit/core";
import MemberBoard from "./MemberBoard";
import InputWork from "./InputWork";
import MemberHeader from "./MemberHeader";

import CrownIcon from "../../icon/crown.svg";
import DelModal from "./DelModal";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase";

const Members = () => {
  const [datas, setDatas] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [memberToDel, setMemberToDel] = useState(null);

  // 팀장변경
  const handleLeader = async (id) => {
    const updatedMembers = datas.map((member) => ({
      ...member,
      isLeader: member.id === id ? true : false,
    }));
    setDatas(updatedMembers);

    const batch = writeBatch(db);
    updatedMembers.forEach((member) => {
      const memberRef = doc(db, "works", member.id.toString());
      batch.set(memberRef, { isLeader: member.isLeader }, { merge: true });
    });
    await batch.commit();
  };

  // 작업추가
  const handleAddWork = async (work, memberId) => {
    if (work.trim()) {
      const member = datas.find((data) => data.id === memberId);
      const newWorkId = `w${member.works.length + 1}`;
      const newWork = {
        id: newWorkId,
        work: work,
        isChecked: false,
        isLeader: false,
      };

      const memberRef = doc(db, "works", memberId.toString());
      await setDoc(
        memberRef,
        {
          works: [...member.works, newWork],
        },
        { merge: true }
      );

      setDatas((prev) =>
        prev.map((data) => {
          if (data.id === memberId) {
            return {
              ...data,
              works: [...data.works, newWork],
            };
          }
          return data;
        })
      );
    }
  };

  // 작업삭제
  const handleRemoveWork = async (memberId, listId) => {
    const member = datas.find((data) => data.id === memberId);
    const updatedWorks = member.works.filter((work) => work.id !== listId);

    const memberRef = doc(db, "works", memberId.toString());
    await setDoc(
      memberRef,
      {
        works: updatedWorks,
      },
      { merge: true }
    );

    setDatas((prev) =>
      prev.map((data) => {
        if (data.id === memberId) {
          return {
            ...data,
            works: updatedWorks,
          };
        }
        return data;
      })
    );
  };

  // 팀원추가
  const handleAddMember = async (name) => {
    if (name.trim()) {
      const newMemberId = datas.length + 1;
      const newMember = {
        id: newMemberId.toString(),
        name: name,
        works: [],
        isLeader: false,
      };

      const memberRef = doc(db, "works", newMemberId.toString());
      await setDoc(memberRef, newMember);

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
  const handleDeleteMember = async () => {
    if (memberToDel) {
      const memberRef = doc(db, "works", memberToDel.id);
      await deleteDoc(memberRef);

      setDatas((prev) => prev.filter((member) => member.id !== memberToDel.id));
      setMemberToDel(null);
      handleCloseModal();
    }
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

  // works 데이터 가져오기
  const fetchWorks = async () => {
    try {
      const worksCollection = collection(db, "works");
      const worksDocs = await getDocs(worksCollection);
      const data = worksDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDatas(data);
    } catch (e) {
      console.log("works 데이터를 불러오는데 실패했습니다. ", e);
    }
  };
  useEffect(() => {
    fetchWorks();
  }, []);

  const names = datas.map((data) => data.name);

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
                {data.isLeader && <Icon src={CrownIcon} alt="crown-icon" />}
              </NameBox>
              <InputWork
                handleAddWork={(work) => handleAddWork(work, data.id)}
              />
              <MemberBoard
                id={data.id}
                works={data.works}
                handleRemoveWork={handleRemoveWork}
                setDatas={setDatas}
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
