import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import styled from "styled-components";
import WorkList from "./WorkList";

const MemberBoard = ({ id, works, handleRemoveWork, setDatas }) => {
  return (
    <SortableContext
      items={works.map((work) => work.id)}
      strategy={verticalListSortingStrategy}
    >
      <BoardUl>
        {works.map((work) => {
          return (
            <WorkList
              id={id}
              key={work.id}
              workId={work.id}
              work={work.work}
              handleRemoveWork={handleRemoveWork}
              setDatas={setDatas}
            />
          );
        })}
      </BoardUl>
    </SortableContext>
  );
};

export default MemberBoard;

// style
const BoardUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
`;
