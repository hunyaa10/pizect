import styled from "styled-components";
import GridDotIcon from "../../icon/grid-dot3.svg";

const UiList = ({
  sortableStyle,
  setNodeRef,
  attributes,
  listeners,
  handleContextMenu,
  isChecked,
  date,
  text,
  onClick,
  menuVisible,
  handleComplete,
  handleDelete,
}) => {
  return (
    <List
      ref={setNodeRef}
      style={sortableStyle}
      onContextMenu={handleContextMenu}
    >
      <TextBox onClick={onClick || handleComplete}>
        {date && <Date $isChecked={isChecked}>{date}</Date>}
        <Text $isChecked={isChecked}>{text}</Text>
      </TextBox>
      <MoveIcon {...attributes} {...listeners}>
        <Icon src={GridDotIcon} alt="grid-dot3-icon" />
      </MoveIcon>
      {menuVisible && (
        <ContextMenu>
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
        </ContextMenu>
      )}
    </List>
  );
};

export default UiList;

// style
const List = styled.li`
  width: 100%;
  padding: 0.5rem 0.3rem 0.5rem 0.5rem;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const MoveIcon = styled.div`
  cursor: pointer;
  color: #ccc;
`;
const Icon = styled.img`
  width: 8px;
`;
const TextBox = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const Text = styled.p`
  text-decoration: ${({ $isChecked }) =>
    $isChecked ? "line-through" : "none"};
  color: ${({ $isChecked }) => ($isChecked ? "#ccc" : "#333")};
`;
const Date = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ $isChecked }) => ($isChecked ? "#ccc" : "#666")};
`;
const ContextMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 80%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  border-radius: 0.2rem;
  z-index: 99;
`;

const MenuItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
