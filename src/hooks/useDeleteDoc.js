import { deleteDoc, doc } from "firebase/firestore";
import { useCallback } from "react";

const useDeleteDoc = (db, collectionName, setData) => {
  const deleteDocument = useCallback(
    async (id) => {
      if (id) {
        await deleteDoc(doc(db, collectionName, id.toString()));
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    },
    [db, collectionName, setData]
  );

  return deleteDocument;
};

export default useDeleteDoc;
