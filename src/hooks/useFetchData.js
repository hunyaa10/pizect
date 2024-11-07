import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const useFetchData = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const collectionRef = collection(db, collectionName);
      const docs = await getDocs(collectionRef);
      const fetchedData = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedData = fetchedData.sort((a, b) => a.order - b.order);
      setData(sortedData);
    } catch (e) {
      console.error(`${collectionName} 데이터를 불러오는데 실패했습니다.`, e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  return { data, setData, isLoading };
};

export default useFetchData;
