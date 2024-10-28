import useSortableList from "../../../hooks/useSortableList";

const MeetingList = ({ id, text, date, handleDeleteMeet, setMeets }) => {
  const { ListItem } = useSortableList(
    id,
    text,
    null,
    () => handleDeleteMeet(id),
    null,
    date,
    "meetings",
    setMeets
  );

  return ListItem;
};

export default MeetingList;
