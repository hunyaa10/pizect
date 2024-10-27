import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import UiList from "../components/uiComponents/UiList";

const useSortableList = (id, text, onClick, handleRemoveFn, memberId, date) => {
  const [isChecked, setIsChecked] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const sortableStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // 좌클릭 시 완료
  const handleComplete = () => {
    setIsChecked(!isChecked);
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
      handleComplete={handleComplete}
      handleDelete={handleDelete}
    />
  );

  return { ListItem };
};

export default useSortableList;
