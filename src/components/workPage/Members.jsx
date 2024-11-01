import React, { useState } from "react";
import useDragSensors from "../../hooks/useDragSensors";
import styled from "styled-components";
import { closestCorners, DndContext } from "@dnd-kit/core";
import MemberHeader from "./MemberHeader";
import Member from "./Member";
import { deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";
import useFetchData from "../../hooks/useFetchData";
import useDragEndWorks from "../../hooks/useDragEndWorks";

const Members = () => {
  const { data: datas, setData: setDatas } = useFetchData("works");

  const [showDelModal, setShowDelModal] = useState(false);
  const [memberToDel, setMemberToDel] = useState(null);

  const sensors = useDragSensors();
  const handleDragEnd = useDragEndWorks(datas, setDatas, db);

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
      const maxOrder =
        member.works.length > 0
          ? Math.max(...member.works.map((w) => w.order))
          : 0;

      const maxId =
        member.works.length > 0
          ? Math.max(
              ...member.works.map((w) => parseInt(w.id.replace("w", "")))
            )
          : 0;
      const newWorkId = `w${maxId + 1}`;

      const newWork = {
        id: newWorkId,
        work: work,
        isChecked: false,
        isLeader: false,
        order: maxOrder + 1,
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

  return (
    <>
      <MemberHeader
        names={datas.map((data) => data.name)}
        handleAddMember={handleAddMember}
      />
      <Container>
        {datas.map((data) => (
          <DndContext
            key={data.id}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={(e) => handleDragEnd(e, data.id)}
          >
            <Member
              data={data}
              setDatas={setDatas}
              handleLeader={handleLeader}
              handleAddWork={handleAddWork}
              handleRemoveWork={handleRemoveWork}
              handleShowModal={handleShowModal}
              showDelModal={showDelModal}
              memberToDel={memberToDel}
              handleCloseModal={handleCloseModal}
              handleDeleteMember={handleDeleteMember}
            />
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
