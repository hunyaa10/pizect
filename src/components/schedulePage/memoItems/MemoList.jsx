import { useEffect, useState } from "react";
import useSortableList from "../../../hooks/useSortableList";
import ListModal from "./ListModal";

const MemoList = ({
  id,
  title,
  script,
  handleDeleteMemo,
  handleUpdateMemo,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    showModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showModal]);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { ListItem } = useSortableList(
    id,
    title,
    handleOpenModal,
    () => handleDeleteMemo(id),
    null,
    null,
    "memos",
    null
  );

  return (
    <>
      {ListItem}
      {showModal && (
        <ListModal
          handleCloseModal={handleCloseModal}
          title={title}
          script={script}
          handleUpdateMemo={(newTitle, newScript) =>
            handleUpdateMemo(id, newTitle, newScript)
          }
        />
      )}
    </>
  );
};

export default MemoList;
