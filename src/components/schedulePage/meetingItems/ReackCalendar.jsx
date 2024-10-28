import { format, isBefore, startOfToday } from "date-fns";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const ReackCalendar = ({ setCalendarOpen, selectedDate, setSelectedDate }) => {
  const tileClassName = ({ date }) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    if (formattedDate === "2024-10-14" || formattedDate === "2024-10-23") {
      return "highlighted-date";
    }
    return null;
  };
  const handleClickDate = (date) => {
    setSelectedDate(date);
    // console.log(selectedDate);
  };

  return (
    <CalendarWrapper>
      <StyledCalendar
        onChange={(date) => {
          setSelectedDate(date);
          setCalendarOpen(false);
        }}
        onClickDay={handleClickDate}
        value={selectedDate}
        tileClassName={tileClassName}
        tileDisabled={({ date }) => isBefore(date, startOfToday())}
        formatDay={(locale, date) => format(date, "d")}
        calendarType="gregory"
        next2Label={null}
        prev2Label={null}
      />
    </CalendarWrapper>
  );
};

export default ReackCalendar;

// style
const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  .react-calendar__tile {
    padding: 15px 10px;
  }
  .react-calendar__tile--now {
    background: none;
    position: relative;
    &::after {
      content: "오늘";
      font-size: 0.6rem;
      font-weight: 500;
      color: #61797f;
      display: block;
      border-radius: 100%;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 600;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: #dde9ee67;
    border-radius: 0.5rem;
    color: #61797f;
  }
  .highlighted-date {
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 5px;
      height: 5px;
      background-color: #61797f;
      border-radius: 100%;
      position: absolute;
      bottom: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .react-calendar__tile:disabled {
    background-color: transparent;
    color: #ccc;
  }
  .react-calendar__navigation button:enabled:hover {
    background-color: #dde9ee67;
    border-radius: 0.5rem;
  }
`;
const StyledCalendar = styled(Calendar)`
  width: 30%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border: none;
  border-radius: 0.5rem;
`;