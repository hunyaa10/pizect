import React, { useState } from "react";
import styled from "styled-components";

const InputMemo = ({ handleAddMemo }) => {
  const [titleValue, setTitleValue] = useState("");
  const [scriptValue, setScriptValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleValue) return;
    handleAddMemo(titleValue, scriptValue);
    setTitleValue("");
    setScriptValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputBox>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          type="text"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          required
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="script">내용</Label>
        <Textarea
          id="script"
          value={scriptValue}
          onChange={(e) => setScriptValue(e.target.value)}
        />
      </InputBox>
      <Btn type="submit">공지등록하기</Btn>
    </Form>
  );
};

export default InputMemo;

// style
const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputBox = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const Label = styled.label`
  font-size: 0.8rem;
`;
const Input = styled.input`
  width: 90%;
  padding: 0.25rem 0.5rem;
`;
const Textarea = styled.textarea`
  width: 90%;
  height: 40vh;
  padding: 0.5rem;
`;
const Btn = styled.button`
  margin: 1rem 0 0 2rem;
`;
