import useSortableList from "../../hooks/useSortableList";

const WorkList = ({ id, workId, work, handleRemoveWork, setDatas }) => {
  const { ListItem } = useSortableList(
    id,
    work,
    null,
    () => handleRemoveWork(id, workId),
    workId,
    null,
    "works",
    setDatas
  );
  return ListItem;
};

export default WorkList;
