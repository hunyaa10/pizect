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
  handleCompleteList,
  handleDeleteList,
}) => {
  return (
    <List
      ref={setNodeRef}
      style={sortableStyle}
      onContextMenu={handleContextMenu}
    >
      <TextBox onClick={onClick || handleCompleteList}>
        {date && <Date $isChecked={isChecked}>{date}</Date>}
        <Text $isChecked={isChecked}>{text}</Text>
      </TextBox>
      <MoveIcon {...attributes} {...listeners}>
        <Icon src={GridDotIcon} alt="grid-dot3-icon" />
      </MoveIcon>
      {menuVisible && (
        <ContextMenu>
          <MenuItem onClick={handleDeleteList}>삭제</MenuItem>
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
  font-size: 1.3rem;
  text-decoration: ${({ $isChecked }) =>
    $isChecked ? "line-through" : "none"};
  color: ${({ $isChecked }) => ($isChecked ? "#ccc" : "#333")};

  @media (max-width: 1440px) {
    font-size: 1rem;
  }
`;
const Date = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ $isChecked }) => ($isChecked ? "#ccc" : "#666")};

  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
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
