import { closestCorners, DndContext } from "@dnd-kit/core";
import React, { useState } from "react";
import styled from "styled-components";
import Board from "./meetingItems/Board";
import InputTask from "./meetingItems/InputTask";
import useDragSensors from "../../hooks/useDragSensors";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { meetingData } from "../../data/scheduleData";

const Meeting = () => {
  const [meets, setMeets] = useState(meetingData);

  const sensors = useDragSensors();
  const { handleDragEnd } = useDragAndDrop(meets, setMeets);

  // 새 작업 추가
  const handleAddTask = (content) => {
    setMeets((meets) => [...meets, { id: meets.length + 1, content }]);
  };

  return (
    <MeetingBox>
      <Title>회의일정</Title>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <InputTask handleAddTask={handleAddTask} />
        <Board meets={meets} />
      </DndContext>
    </MeetingBox>
  );
};

export default Meeting;

// style
const MeetingBox = styled.div`
  width: 30%;
  height: fit-content;
  padding: 2rem 1rem 4rem 1rem;
  background-color: #f3f7f8;
  border-radius: 0.2rem;
`;
const Title = styled.h3`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  text-align: center;
`;
