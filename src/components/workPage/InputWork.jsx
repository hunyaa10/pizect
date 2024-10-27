import React, { useState } from "react";
import styled from "styled-components";
import { UiInput } from "../uiComponents/UiInput";
import UiBtn from "../uiComponents/UiBtn";

const InputWork = ({ handleAddWork }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleAddWork(inputValue);
    setInputValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <UiInput
        type="text"
        value={inputValue}
        placeholder="작업을 추가하세요"
        onChange={(e) => setInputValue(e.target.value)}
        width="80%"
      />
      <UiBtn type="submit">추가</UiBtn>
    </Form>
  );
};

export default InputWork;

// style
const Form = styled.form`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
