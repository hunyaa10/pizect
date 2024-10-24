import { closestCorners, DndContext } from "@dnd-kit/core";

import React, { useState } from "react";
import styled from "styled-components";
import MemoBoard from "./memoItems/MemoBoard";
import InputMemo from "./memoItems/InputMemo";
import useDragSensors from "../../hooks/useDragSensors";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { memoData } from "../../data/scheduleData";

const Memo = () => {
  const [memos, setMemos] = useState(memoData);

  const sensors = useDragSensors();
  const { handleDragEnd } = useDragAndDrop(memos, setMemos);

  // 새 메모 추가
  const handleAddMemo = (title, script) => {
    setMemos((memos) => [...memos, { id: memos.length + 1, title, script }]);
  };

  return (
    <MemoBox>
      <Title>공지사항</Title>
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <BoardBox>
          <MemoBoard memos={memos} />
          <InputMemo handleAddMemo={handleAddMemo} />
        </BoardBox>
      </DndContext>
    </MemoBox>
  );
};

export default Memo;

// style
const MemoBox = styled.div`
  width: 65%;
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
const BoardBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
