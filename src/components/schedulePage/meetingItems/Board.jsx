import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import styled from "styled-components";
import MeetingList from "./MeetingList";
import { format } from "date-fns";

const Board = ({ meets, handleDeleteMeet, setMeets }) => {
  return (
    <SortableContext items={meets} strategy={verticalListSortingStrategy}>
      <BoardUl>
        {meets.map((meet) => {
          const newDate = format(meet.date, "MM/dd");
          return (
            <MeetingList
              key={meet.id}
              id={meet.id}
              date={newDate}
              text={meet.text}
              handleDeleteMeet={handleDeleteMeet}
              setMeets={setMeets}
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
