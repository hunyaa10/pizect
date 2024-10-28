import useSortableList from "../../hooks/useSortableList";

const WorkList = ({ workId, memberId, work, handleRemoveWork, setDatas }) => {
  const { ListItem } = useSortableList(
    workId,
    work,
    null,
    () => handleRemoveWork(memberId, workId),
    memberId,
    null,
    "works",
    setDatas
  );
  return ListItem;
};

export default WorkList;
