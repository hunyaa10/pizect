import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import styled from "styled-components";

const useSortableList = (id, text, showCheckbox) => {
  const [checked, setChecked] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const handleListCheck = () => {
    setChecked(!checked);
  };

  const sortableStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const ListItem = (
    <List ref={setNodeRef} {...attributes} {...listeners} style={sortableStyle}>
      {showCheckbox && <Input type="checkbox" id={id} />}
      <Label>{text}</Label>
    </List>
  );

  return { ListItem };
};

export default useSortableList;

// style
const List = styled.li`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Input = styled.input``;
const Label = styled.label``;
