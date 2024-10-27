import { useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";

const useDragAndDrop = (state, setState) => {
  const getTaskPosition = useCallback(
    (id) => state.findIndex((s) => s.id === id),
    [state]
  );

  const handleDragEnd = useCallback(
    (e) => {
      const { active, over } = e;
      // console.log(active.id, over.id);

      if (!over) return;
      if (active.id === over.id) return;

      setState((prevState) => {
        const originalPosition = getTaskPosition(active.id);
        const newPosition = getTaskPosition(over.id);
        const newState = arrayMove(prevState, originalPosition, newPosition);
        return newState;
      });
    },
    [getTaskPosition, setState]
  );

  return { handleDragEnd };
};

export default useDragAndDrop;
