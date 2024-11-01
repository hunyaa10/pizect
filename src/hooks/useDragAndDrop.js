import { useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useDragAndDrop = (state, setState, collectionName) => {
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

        const orderedIds = newState.map((item, index) => ({
          id: item.id,
          order: index + 1,
        }));
        orderedIds.forEach(async (item) => {
          const docRef = doc(db, collectionName, item.id);
          await updateDoc(docRef, { order: item.order });
        });

        return newState;
      });
    },
    [getTaskPosition, setState]
  );

  return { handleDragEnd };
};

export default useDragAndDrop;
