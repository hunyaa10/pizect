import { closestCorners, DndContext } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemoBoard from "./memoItems/MemoBoard";
import InputMemo from "./memoItems/InputMemo";
import useDragSensors from "../../hooks/useDragSensors";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { UiTitle } from "../uiComponents/UiTitle";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Memo = () => {
  const [memos, setMemos] = useState([]);

  const sensors = useDragSensors();
  const { handleDragEnd } = useDragAndDrop(memos, setMemos, "memos");

  // 새 메모 추가
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

  // 메모 삭제
  const handleDeleteMemo = async (id) => {
    await deleteDoc(doc(db, "memos", id.toString()));
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  // memos 데이터 가져오기
  const fetchMemos = async () => {
    try {
      const memosCollection = collection(db, "memos");
      const memosDocs = await getDocs(memosCollection);
      const data = memosDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedMemos = data.sort((a, b) => a.order - b.order);
      setMemos(sortedMemos);
      // console.log(data);
    } catch (e) {
      console.log("memos 데이터를 불러오는데 실패했습니다. ", e);
    }
  };
  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <MemoBox>
      <UiTitle>공지사항</UiTitle>
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <BoardBox>
          <MemoBoard memos={memos} handleDeleteMemo={handleDeleteMemo} />
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
