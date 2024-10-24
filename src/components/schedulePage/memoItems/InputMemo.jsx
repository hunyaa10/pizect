import React, { useState } from "react";
import styled from "styled-components";
import { UiInput } from "../../uiComponents/UiInput";
import UiBtn from "../../uiComponents/UiBtn";

const InputMemo = ({ handleAddMemo }) => {
  const [titleValue, setTitleValue] = useState("");
  const [scriptValue, setScriptValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleValue.trim()) return;
    handleAddMemo(titleValue, scriptValue);
    setTitleValue("");
    setScriptValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputBox>
        <Label htmlFor="title">제목</Label>
        <UiInput
          id="title"
          type="text"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          width={"90%"}
          placeholder="제목을 입력하세요"
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="script">내용</Label>
        <Textarea
          id="script"
          value={scriptValue}
          onChange={(e) => setScriptValue(e.target.value)}
          placeholder="메모를 입력하세요"
        />
      </InputBox>
      <UiBtn type="submit" margin="1rem 0 0 2rem">
        공지등록하기
      </UiBtn>
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
  font-size: 0.9rem;
  font-weight: 500;
  color: #3d7685;
`;
const Textarea = styled.textarea`
  width: 90%;
  height: 40vh;
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
