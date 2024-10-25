import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import styled from "styled-components";
import GridDotIcon from "../icon/grid-dot3.svg";

const useSortableList = (id, text, onClick) => {
  const [isChecked, setIsChecked] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const sortableStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // 디폴트 클릭이벤트 >> 목록체크함수
  const handleListCheck = () => {
    setIsChecked(!isChecked);
  };

  const ListItem = (
    <List ref={setNodeRef} style={sortableStyle}>
      <Text $isChecked={isChecked} onClick={onClick || handleListCheck}>
        {text}
      </Text>
      <MoveIcon {...attributes} {...listeners}>
        <Icon src={GridDotIcon} alt="grid-dot3-icon" />
      </MoveIcon>
    </List>
  );

  return { ListItem };
};

export default useSortableList;

// style
const List = styled.li`
  width: 100%;
  padding: 0.5rem 0.3rem 0.5rem 1rem;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MoveIcon = styled.div`
  cursor: pointer;
  color: #ccc;
`;
const Icon = styled.img`
  width: 8px;
`;
const Text = styled.p`
  text-decoration: ${({ $isChecked }) =>
    $isChecked ? "line-through" : "none"};
  color: ${({ $isChecked }) => ($isChecked ? "#ccc" : "#333")};
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
