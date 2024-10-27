import useSortableList from "../../../hooks/useSortableList";

const MeetingList = ({ id, text, date, handleDeleteMeet }) => {
  const { ListItem } = useSortableList(
    id,
    text,
    null,
    () => handleDeleteMeet(id),
    null,
    date
  );

  return ListItem;
};

export default MeetingList;
