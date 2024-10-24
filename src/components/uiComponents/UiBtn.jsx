import styled from "styled-components";

const UiBtn = ({ type = "button", onClick, children, margin = "0" }) => {
  return (
    <Btn type={type} onClick={onClick} $margin={margin}>
      {children}
    </Btn>
  );
};

export default UiBtn;

// style
const Btn = styled.button`
  margin: ${(props) => props.$margin};
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #3d7685;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;
