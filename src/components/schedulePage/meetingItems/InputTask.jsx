import React, { useState } from "react";
import styled from "styled-components";

const InputTask = ({ handleAddTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    handleAddTask(inputValue);
    setInputValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <AddBtn type="submit">추가하기</AddBtn>
    </Form>
  );
};

export default InputTask;

// style
const Form = styled.form`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Input = styled.input`
  padding: 0.25rem 1rem;
`;
const AddBtn = styled.button``;
