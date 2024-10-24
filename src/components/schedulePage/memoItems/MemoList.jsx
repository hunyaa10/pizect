import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import styled from "styled-components";

const MemoList = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const sortableStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <List ref={setNodeRef} {...attributes} {...listeners} style={sortableStyle}>
      <Input type="checkbox" id={id} />
      <TaskText>{title}</TaskText>
    </List>
  );
};

export default MemoList;

// style
const List = styled.li`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Input = styled.input``;
const TaskText = styled.p``;
