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
} from "firebase/firestore";
import { db } from "../../firebase";

const Meeting = () => {
  const [meets, setMeets] = useState([]);

  const sensors = useDragSensors();
  const { handleDragEnd } = useDragAndDrop(meets, setMeets);

  // 새 회의 추가
  const handleAddMeet = async ({ date, text }) => {
    try {
      const docRef = await addDoc(collection(db, "meetings"), {
        date,
        text,
        isChecked: false,
      });
      setMeets((meets) => [
        { id: docRef.id, date, text, isChecked: false },
        ...meets,
      ]);
    } catch (e) {
      console.log("회의등록에 실패했습니다: ", e);
    }
  };

  // 회의 삭제
  const handleDeleteMeet = async (id) => {
    try {
      await deleteDoc(doc(db, "meetings", id));
      setMeets((prev) => prev.filter((meet) => meet.id !== id));
    } catch (e) {
      console.log("회의삭제에 실패했습니다: ", e);
    }
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
      // 날짜 내림차순으로 정렬
      const sortedData = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

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
