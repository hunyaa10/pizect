import styled from "styled-components";
import GridDotIcon from "../../icon/grid-dot3.svg";

const UiList = ({
  sortableStyle,
  setNodeRef,
  attributes,
  listeners,
  handleContextMenu,
  isChecked,
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
      <Text $isChecked={isChecked} onClick={onClick || handleComplete}>
        {text}
      </Text>
      <MoveIcon {...attributes} {...listeners}>
        <Icon src={GridDotIcon} alt="grid-dot3-icon" />
      </MoveIcon>
      {menuVisible && (
        <ContextMenu>
          {/* <MenuItem onClick={handleComplete}>
            {isChecked ? "작업완료해제" : "작업완료"}
          </MenuItem> */}
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
  padding: 0.5rem 0.3rem 0.5rem 1rem;
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
const Text = styled.p`
  width: 95%;
  text-decoration: ${({ $isChecked }) =>
    $isChecked ? "line-through" : "none"};
  color: ${({ $isChecked }) => ($isChecked ? "#ccc" : "#333")};
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const ContextMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 80%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  border-radius: 0.2rem;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
