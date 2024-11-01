import { doc, setDoc } from "firebase/firestore";
import { useCallback } from "react";

const useDragEndWorks = (datas, setDatas, db) => {
  const handleDragEnd = useCallback(
    async (event, memberId) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const member = datas.find((data) => data.id === memberId);
      const oldIndex = member.works.findIndex((work) => work.id === active.id);
      const newIndex = member.works.findIndex((work) => work.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newWorks = [...member.works];
        const [movedItem] = newWorks.splice(oldIndex, 1);
        newWorks.splice(newIndex, 0, movedItem);

        setDatas((prev) =>
          prev.map((data) => {
            if (data.id === memberId) {
              return { ...data, works: newWorks };
            }
            return data;
          })
        );

        const memberRef = doc(db, "works", memberId.toString());
        await setDoc(memberRef, { works: newWorks }, { merge: true });
      }
    },
    [datas, setDatas, db]
  );

  return handleDragEnd;
};

export default useDragEndWorks;
