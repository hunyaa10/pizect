import useSortableList from "../../../hooks/useSortableList";

const MemoList = ({ id, title, showCheckbox = false }) => {
  const { ListItem } = useSortableList(id, title, showCheckbox);

  return ListItem;
};

export default MemoList;
