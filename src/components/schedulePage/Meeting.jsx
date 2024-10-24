import { closestCorners, DndContext } from "@dnd-kit/core";
import React, { useState } from "react";
import styled from "styled-components";
import Board from "./meetingItems/Board";
import InputMeet from "./meetingItems/InputMeet";
import useDragSensors from "../../hooks/useDragSensors";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { meetingData } from "../../data/scheduleData";
import { UiTitle } from "../uiComponents/UiTitle";

const Meeting = () => {
  const [meets, setMeets] = useState(meetingData);

  const sensors = useDragSensors();
  const { handleDragEnd } = useDragAndDrop(meets, setMeets);

  // 새 회의 추가
  const handleAddMeet = (text) => {
    setMeets((meets) => [...meets, { id: meets.length + 1, text }]);
  };

  return (
    <MeetingBox>
      <UiTitle>회의일정</UiTitle>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <InputMeet handleAddMeet={handleAddMeet} />
        <Board meets={meets} />
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
