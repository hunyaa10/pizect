import React, { useState } from "react";
import styled from "styled-components";
import { UiInput } from "../../uiComponents/UiInput";
import UiBtn from "../../uiComponents/UiBtn";
import ReackCalendar from "./ReackCalendar";
import { format } from "date-fns";

const InputMeet = ({ handleAddMeet }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedDate) return;

    const newDate = format(selectedDate, "MM/dd");
    handleAddMeet({ date: newDate, text: inputValue });
    setInputValue("");
    setSelectedDate(null);
    setCalendarOpen(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <UiInput
          width="50%"
          type="text"
          value={selectedDate ? format(selectedDate, "MM/dd") : ""}
          placeholder="날짜를 선택하세요"
          readOnly={true}
          onClick={() => setCalendarOpen(true)}
        />

        <TextWrapper>
          <UiInput
            width="84%"
            type="text"
            value={inputValue}
            placeholder="회의를 추가하세요"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <UiBtn type="submit">추가</UiBtn>
        </TextWrapper>
      </Form>
      {calendarOpen && (
        <ReackCalendar
          setCalendarOpen={setCalendarOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
};

export default InputMeet;

// style
const Form = styled.form`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`;
const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
