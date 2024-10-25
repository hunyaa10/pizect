import useSortableList from "../../../hooks/useSortableList";

const MeetingList = ({ id, text }) => {
  const { ListItem } = useSortableList(id, text);

  return ListItem;
};

export default MeetingList;
