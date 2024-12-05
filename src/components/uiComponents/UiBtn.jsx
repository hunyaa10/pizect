import styled from "styled-components";

const UiBtn = ({
  type = "button",
  onClick,
  children,
  margin = "0",
  padding = "0.25rem 0.5rem",
  $bgcolor = "#3d7685",
  fontSize = "1rem",
}) => {
  return (
    <Btn
      type={type}
      onClick={onClick}
      $margin={margin}
      $padding={padding}
      $bgcolor={$bgcolor}
      fontSize={fontSize}
    >
      {children}
    </Btn>
  );
};

export default UiBtn;

// style
const Btn = styled.button`
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => props.$bgcolor};
  color: #fff;
  font-size: ${(props) => props.fontSize};
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }

  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
`;
