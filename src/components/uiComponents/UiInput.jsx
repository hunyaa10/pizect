import styled from "styled-components";

export const UiInput = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  width = "100%",
}) => {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      width={width}
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
`;
