import styled from "styled-components";

export const UiInput = ({
  id,
  type = "text",
  value,
  onClick,
  onChange,
  placeholder,
  width = "100%",
  readOnly = false,
  required = true,
}) => {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onClick={onClick}
      onChange={onChange}
      width={width}
      readOnly={readOnly}
      required={required}
    />
  );
};

// style
const Input = styled.input`
  width: ${(props) => props.width};
  padding: 0.5rem;
  border: 1px solid #c2cfd2;
  border-radius: 0.25rem;
  &:focus {
    outline: none;
    border: 1px solid #61797f;
  }
  &::placeholder {
    color: #ccc;
  }
  &[readOnly] {
    cursor: pointer;
    background-color: #bdd8df;
    border: 1px solid #bdd8df;
    &::placeholder {
      color: #fff;
    }
  }
`;
