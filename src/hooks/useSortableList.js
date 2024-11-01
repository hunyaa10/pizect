import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import UiList from "../components/uiComponents/UiList";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const useSortableList = (
  id, // "1"
  text,
  onClick,
  handleRemoveFn,
  workId, // "w1"
  date,
  collectionName,
  setState
) => {
  const [isChecked, setIsChecked] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: workId || id });

  const sortableStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // isChecked 상태반영하는 초기화코드
  useEffect(() => {
    const fetchInitialState = async () => {
      const listDocRef = doc(db, collectionName, id);
      const docSnap = await getDoc(listDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // works
        if (collectionName === "works") {
          const workItem = data.works.find((work) => work.id === workId);
          if (workItem) {
            setIsChecked(workItem.isChecked);
          }
        } else {
          // meetings
          setIsChecked(data.isChecked);
        }
      }
    };

    fetchInitialState();
  }, [collectionName, id]);

  // 좌클릭 시 완료표시
  const handleComplete = async (collectionName, id, workId) => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    // works
    if (workId) {
      const worksDocRef = doc(db, collectionName, id);
      const docSnap = await getDoc(worksDocRef);

      if (docSnap.exists()) {
        const worksArray = docSnap.data().works.map((work) => {
          if (work.id === workId) {
            return { ...work, isChecked: newCheckedState };
          }
          return work;
        });
        await updateDoc(worksDocRef, { works: worksArray });
      }

      setState((prev) =>
        prev.map((work) =>
          work.id === workId ? { ...work, isChecked: newCheckedState } : work
        )
      );
    } else {
      // meetings
      const meetDocRef = doc(db, collectionName, id);
      await updateDoc(meetDocRef, { isChecked: newCheckedState });

      setState((prev) =>
        prev.map((meet) =>
          meet.id === id ? { ...meet, isChecked: newCheckedState } : meet
        )
      );
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuVisible(true);
  };

  const handleDelete = () => {
    if (workId) {
      handleRemoveFn(workId, id);
    } else {
      handleRemoveFn(id);
    }

    setMenuVisible(false);
  };

  const handleClickOutside = (e) => {
    if (menuVisible && !e.target.closest(".context-menu")) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuVisible]);

  const ListItem = (
    <UiList
      sortableStyle={sortableStyle}
      setNodeRef={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      handleContextMenu={handleContextMenu}
      isChecked={isChecked}
      date={date}
      text={text}
      onClick={onClick}
      menuVisible={menuVisible}
      handleComplete={() => handleComplete(collectionName, id, workId)}
      handleDelete={handleDelete}
    />
  );

  return { ListItem };
};

export default useSortableList;
