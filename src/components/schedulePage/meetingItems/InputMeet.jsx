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
  const [dateError, setDateError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDate === null) {
      setDateError("날짜를 선택하세요");
      return;
    }

    if (inputValue && selectedDate) {
      const newDate = format(selectedDate, "MM/dd");
      handleAddMeet(newDate, inputValue);
      setInputValue("");
      setSelectedDate(null);
      setCalendarOpen(false);
      setDateError("");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <DateWrapper>
          <UiInput
            width="30%"
            type="text"
            value={selectedDate ? format(selectedDate, "MM/dd") : ""}
            placeholder="회의 날짜"
            readOnly={true}
            onClick={() => setCalendarOpen(true)}
            required
          />
          <DateError>{dateError}</DateError>
        </DateWrapper>

        <TextWrapper>
          <UiInput
            width="84%"
            type="text"
            value={inputValue}
            placeholder="회의를 추가하세요"
            onChange={(e) => setInputValue(e.target.value)}
            required
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
const DateWrapper = styled.div`
  width: 100%;
`;
const DateError = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: red;
`;
const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
