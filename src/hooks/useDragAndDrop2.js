import { useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";

const useDragAndDrop2 = (state, setState) => {
  const handleDragEnd = useCallback(
    (e) => {
      const { active, over } = e;

      if (!over) return;
      if (active.id === over.id) return;

      // 현재 작업이 드래그된 보드 찾기
      const originalBoardIndex = state.findIndex((board) =>
        board.some((item) => item.id === active.id)
      );

      // 드롭된 보드 찾기
      const newBoardIndex = state.findIndex((board) =>
        board.some((item) => item.id === over.id)
      );

      if (originalBoardIndex !== -1 && newBoardIndex !== -1) {
        const originalWorks = state[originalBoardIndex];
        const newWorks = state[newBoardIndex];

        const originalIndex = originalWorks.findIndex(
          (item) => item.id === active.id
        );
        const [movedItem] = originalWorks.splice(originalIndex, 1);

        // 원래 보드에서 항목 제거
        const updatedOriginalBoard = [...originalWorks];
        setState((prev) => {
          const newState = [...prev];
          newState[originalBoardIndex] = updatedOriginalBoard;
          newState[newBoardIndex] = [...newWorks, movedItem];
          return newState;
        });
      }
    },
    [setState, state]
  );

  return { handleDragEnd };
};

export default useDragAndDrop2;
