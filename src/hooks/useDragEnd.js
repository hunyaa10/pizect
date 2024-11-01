import { useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const useDragEnd = (state, setState, collectionName) => {
  const getTaskPosition = useCallback(
    (id) => state.findIndex((s) => s.id === id),
    [state]
  );

  const handleDragEnd = useCallback(
    async (e) => {
      const { active, over } = e;

      if (!over || active.id === over.id) return;

      const originalPosition = getTaskPosition(active.id);
      const newPosition = getTaskPosition(over.id);
      const newState = arrayMove(state, originalPosition, newPosition);

      setState(newState);

      const orderedIds = newState.map((item, index) => ({
        id: item.id,
        order: index + 1,
      }));

      orderedIds.forEach(async (item) => {
        const docRef = doc(collection(db, collectionName), item.id);
        try {
          await setDoc(docRef, { order: item.order }, { merge: true });
        } catch (error) {
          console.error(`Error updating document ${item.id}:`, error);
        }
      });
    },
    [getTaskPosition, setState, state]
  );

  return { handleDragEnd };
};

export default useDragEnd;
