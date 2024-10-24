import React, { useState } from "react";
import styled from "styled-components";
import { UiInput } from "../../uiComponents/UiInput";
import UiBtn from "../../uiComponents/UiBtn";

const InputMeet = ({ handleAddMeet }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleAddMeet(inputValue);
    setInputValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <UiInput
        type="text"
        value={inputValue}
        placeholder="회의를 추가하세요"
        onChange={(e) => setInputValue(e.target.value)}
        width="84%"
      />
      <UiBtn type="submit">추가</UiBtn>
    </Form>
  );
};

export default InputMeet;

// style
const Form = styled.form`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
