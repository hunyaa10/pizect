import React, { useState } from "react";
import styled from "styled-components";
import UiBtn from "../uiComponents/UiBtn";
import { UiInput } from "../uiComponents/UiInput";

const MemberHeader = ({ names, handleAddMember }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleAddMember(inputValue);
      setInputValue("");
    }
  };

  return (
    <Header>
      <Members>
        {names.map((name) => (
          <Member key={name}>{name}</Member>
        ))}
      </Members>
      <Form onSubmit={handleSubmit}>
        <UiInput
          placeholder="이름을 입력하세요"
          width="50%"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <UiBtn type="submit">팀원 등록하기</UiBtn>
      </Form>
    </Header>
  );
};

export default MemberHeader;

// style
const Header = styled.header`
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Members = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
`;
const Member = styled.p``;
const Form = styled.form`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;
