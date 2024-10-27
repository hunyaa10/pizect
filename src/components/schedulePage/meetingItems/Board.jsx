import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import styled from "styled-components";
import MeetingList from "./MeetingList";

const Board = ({ meets, handleDeleteMeet }) => {
  return (
    <SortableContext items={meets} strategy={verticalListSortingStrategy}>
      <BoardUl>
        {meets.map((meet) => {
          return (
            <MeetingList
              key={meet.id}
              id={meet.id}
              date={meet.date}
              text={meet.text}
              handleDeleteMeet={handleDeleteMeet}
            />
          );
        })}
      </BoardUl>
    </SortableContext>
  );
};

export default Board;

// style
const BoardUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
`;
