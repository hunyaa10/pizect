import { useState } from "react";
import useSortableList from "../../../hooks/useSortableList";
import ListModal from "./ListModal";

const MemoList = ({ id, title, script }) => {
  const [showModal, setShowModal] = useState(false);

  // 모달창 이벤트함수
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { ListItem } = useSortableList(id, title, handleOpenModal);

  return (
    <>
      {ListItem}
      {showModal && (
        <ListModal
          handleCloseModal={handleCloseModal}
          title={title}
          script={script}
        />
      )}
    </>
  );
};

export default MemoList;
