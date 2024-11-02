import { addDoc, collection } from "firebase/firestore";
import { useCallback } from "react";

const useAddDoc = (db, collectionName, setData) => {
  const addDocument = useCallback(
    async (data) => {
      if (data) {
        const docRef = await addDoc(collection(db, collectionName), data);
        setData((prevData) => [...prevData, { id: docRef.id, ...data }]);
      }
    },
    [db, collectionName, setData]
  );

  return addDocument;
};

export default useAddDoc;
