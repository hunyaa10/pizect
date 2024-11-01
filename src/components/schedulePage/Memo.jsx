import { closestCorners, DndContext } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemoBoard from "./memoItems/MemoBoard";
import InputMemo from "./memoItems/InputMemo";
import useDragSensors from "../../hooks/useDragSensors";
import useDragEnd from "../../hooks/useDragEnd";
import { UiTitle } from "../uiComponents/UiTitle";
import useFetchData from "../../hooks/useFetchData";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Memo = () => {
  const { data: memos, setData: setMemos } = useFetchData("memos");

  const sensors = useDragSensors();
  const { handleDragEnd } = useDragEnd(memos, setMemos, "memos");

  const handleAddMemo = async (title, script) => {
    if (title.trim() && script.trim()) {
      const maxOrder =
        memos.length > 0 ? Math.max(...memos.map((memo) => memo.order)) : 0;
      const newMemo = {
        title,
        script,
        order: maxOrder + 1,
      };
      const docRef = await addDoc(collection(db, "memos"), newMemo);

      setMemos((memos) => [...memos, { id: docRef.id, ...newMemo }]);
    }
  };

  const handleDeleteMemo = async (id) => {
    await deleteDoc(doc(db, "memos", id.toString()));
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  const handleUpdateMemo = async (id, newTitle, newScript) => {
    const memoRef = doc(db, "memos", id);
    await updateDoc(memoRef, {
      title: newTitle,
      script: newScript,
    });

    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === id ? { ...memo, title: newTitle, script: newScript } : memo
      )
    );
  };

  return (
    <MemoBox>
      <UiTitle>공지사항</UiTitle>
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <BoardBox>
          <MemoBoard
            memos={memos}
            handleDeleteMemo={handleDeleteMemo}
            handleUpdateMemo={handleUpdateMemo}
          />
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
  padding: 2rem 1.5rem 4rem 1.5rem;
  background-color: #f3f7f8;
  border-radius: 0.2rem;
`;
const BoardBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
