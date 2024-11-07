import { closestCorners, DndContext } from "@dnd-kit/core";
import React from "react";
import styled from "styled-components";
import Board from "./meetingItems/Board";
import InputMeet from "./meetingItems/InputMeet";
import useDragSensors from "../../hooks/useDragSensors";
import useDragEnd from "../../hooks/useDragEnd";
import { UiTitle } from "../uiComponents/UiTitle";
import { db } from "../../firebase";
import useAddDoc from "../../hooks/useAddDoc";
import useDeleteDoc from "../../hooks/useDeleteDoc";

const Meeting = ({ meets, setMeets }) => {
  const addMeet = useAddDoc(db, "meetings", setMeets);
  const deleteMeet = useDeleteDoc(db, "meetings", setMeets);

  const sensors = useDragSensors();
  const { handleDragEnd } = useDragEnd(meets, setMeets, "meetings");

  const handleAddMeet = async (date, text) => {
    if (date && text) {
      const maxOrder =
        meets.length > 0 ? Math.max(...meets.map((meet) => meet.order)) : 0;
      const newMeet = { date, text, isChecked: false, order: maxOrder + 1 };

      await addMeet(newMeet);
    }
  };

  const handleDeleteMeet = async (id) => {
    await deleteMeet(id);
  };

  return (
    <MeetingBox>
      <UiTitle>회의일정</UiTitle>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <InputMeet handleAddMeet={handleAddMeet} meets={meets} />
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
