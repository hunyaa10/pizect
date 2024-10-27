import useSortableList from "../../hooks/useSortableList";

const WorkList = ({ workId, memberId, work, handleRemoveWork }) => {
  const { ListItem } = useSortableList(
    workId,
    work,
    null,
    () => handleRemoveWork(memberId, workId),
    memberId
  );
  return ListItem;
};

export default WorkList;
