import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import UiList from "../components/uiComponents/UiList";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const useSortableList = (
  id,
  text,
  onClick,
  handleRemoveFn,
  memberId,
  date,
  collectionName,
  setState
) => {
  const [isChecked, setIsChecked] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const sortableStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // isChecked 상태반영하는 초기화코드
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const listDocRef = doc(db, collectionName, id);
        const docSnap = await getDoc(listDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          // meets인 경우
          setIsChecked(data.isChecked);
        }
      } catch (e) {
        console.error("isChecked에 대한 상태값을 가져오는데 실패했습니다: ", e);
      }
    };

    fetchInitialState();
  }, [collectionName, id]);

  // 좌클릭 시 완료
  const handleComplete = async (collectionName, id) => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    const listDocRef = doc(db, collectionName, id);

    // meets인 경우
    await updateDoc(listDocRef, { isChecked: newCheckedState });

    setState((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, isChecked: newCheckedState } : item
      );
    });
  };

  // 우클릭메뉴 >> 삭제버튼
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuVisible(true);
  };

  // 삭제
  const handleDelete = () => {
    if (memberId) {
      handleRemoveFn(memberId, id);
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
      handleComplete={() => handleComplete(collectionName, id)}
      handleDelete={handleDelete}
    />
  );

  return { ListItem };
};

export default useSortableList;
