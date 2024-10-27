import useSortableList from "../../../hooks/useSortableList";

const MeetingList = ({ id, text, handleDeleteMeet }) => {
  const { ListItem } = useSortableList(
    id,
    text,
    null,
    () => handleDeleteMeet(id),
    null
  );

  return ListItem;
};

export default MeetingList;
