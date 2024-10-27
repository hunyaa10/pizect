import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import styled from "styled-components";
import WorkList from "./WorkList";

const MemberBoard = ({ works, memberId, handleRemoveWork }) => {
  // console.log(works);

  return (
    <SortableContext
      items={works.map((work) => work.id)}
      strategy={verticalListSortingStrategy}
    >
      <BoardUl>
        {works.map((work) => {
          return (
            <WorkList
              key={work.id}
              workId={work.id}
              memberId={memberId}
              work={work.work}
              handleRemoveWork={handleRemoveWork}
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
