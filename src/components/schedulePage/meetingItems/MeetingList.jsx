import useSortableList from "../../../hooks/useSortableList";

const MeetingList = ({ id, text, showCheckbox = true }) => {
  const { ListItem } = useSortableList(id, text, showCheckbox);

  return ListItem;
};

export default MeetingList;
