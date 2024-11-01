import { closestCorners, DndContext } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "./meetingItems/Board";
import InputMeet from "./meetingItems/InputMeet";
import useDragSensors from "../../hooks/useDragSensors";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { UiTitle } from "../uiComponents/UiTitle";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Meeting = () => {
  const [meets, setMeets] = useState([]);

  const sensors = useDragSensors();
  const { handleDragEnd } = useDragAndDrop(meets, setMeets, "meetings");

  // 새 회의 추가
  const handleAddMeet = async (date, text) => {
    if (date && text) {
      const maxOrder =
        meets.length > 0 ? Math.max(...meets.map((meet) => meet.order)) : 0;
      const newMeet = {
        date,
        text,
        isChecked: false,
        order: maxOrder + 1,
      };
      const docRef = await addDoc(collection(db, "meetings"), newMeet);

      setMeets((meets) => [{ id: docRef.id, ...newMeet }, ...meets]);
    }
  };

  // 회의 삭제
  const handleDeleteMeet = async (id) => {
    await deleteDoc(doc(db, "meetings", id.toString()));
    setMeets((prev) => prev.filter((meet) => meet.id !== id));
  };

  // meetings 데이터 가져오기
  const fetchMeetings = async () => {
    try {
      const meetingsCollection = collection(db, "meetings");
      const meetingDocs = await getDocs(meetingsCollection);
      const data = meetingDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedData = data.sort((a, b) => a.order - b.order);

      setMeets(sortedData);
    } catch (e) {
      console.log("meetings 데이터를 불러오는데 실패했습니다. ", e);
    }
  };
  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <MeetingBox>
      <UiTitle>회의일정</UiTitle>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <InputMeet handleAddMeet={handleAddMeet} />
        <Board
          meets={meets}
          handleDeleteMeet={handleDeleteMeet}
          setMeets={setMeets}
        />
      </DndContext>
    </MeetingBox>
  );
};

export default Meeting;

// style
const MeetingBox = styled.div`
  width: 33%;
  height: fit-content;
  padding: 2rem 1.5rem 4rem 1.5rem;
  background-color: #f3f7f8;
  border-radius: 0.2rem;
`;
