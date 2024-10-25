import React from "react";
import styled from "styled-components";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import MemoList from "./MemoList";

const MemoBoard = ({ memos }) => {
  return (
    <SortableContext items={memos} strategy={verticalListSortingStrategy}>
      <BoardUl>
        {memos.map((memo) => (
          <MemoList
            key={memo.id}
            id={memo.id}
            title={memo.title}
            script={memo.script}
          />
        ))}
      </BoardUl>
    </SortableContext>
  );
};

export default MemoBoard;

// style
const BoardUl = styled.ul`
  width: 45%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
`;
